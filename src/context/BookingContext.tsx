import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Booking,
  INITIAL_BOOKINGS,
  MINIMUM_USABLE_WATER,
  TIME_SLOTS,
  VAN_CAPACITY,
} from "../data/data";

import {
  deleteAllFirebaseBookings,
  deleteBookingFromFirestore,
  saveBookingToFirestore,
  subscribeToBookings,
} from "../firebase/bookingService";

type NewBooking = {
  time: string;
  service: string;
  carSize: string;
  waterUsage: number;
  name: string;
  phone: string;
  address: string;
};

export type CustomerDetails = {
  name: string;
  phone: string;
  address: string;
};

type BookingContextType = {
  bookings: Booking[];
  currentWater: number;
  projectedWater: number;
  refillSlots: string[];

  customerDetails: CustomerDetails;
  setCustomerDetails: (details: CustomerDetails) => void;
  clearCustomerDetails: () => void;

  addBooking: (booking: NewBooking) => Promise<boolean>;
  deleteBooking: (bookingId: string) => Promise<boolean>;

  refillWater: () => void;
  resetDemo: () => Promise<void>;

  isTimeAvailable: (time: string, waterUsage: number) => boolean;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const EMPTY_CUSTOMER_DETAILS: CustomerDetails = {
  name: "",
  phone: "",
  address: "",
};

const INITIAL_WATER =
  VAN_CAPACITY -
  INITIAL_BOOKINGS.filter((booking) => booking.completed).reduce(
    (total, booking) => total + booking.waterUsage,
    0,
  );

function getFirstFutureSlotIndex(bookings: Booking[]) {
  const completedIndexes = bookings
    .filter((booking) => booking.completed)
    .map((booking) => TIME_SLOTS.indexOf(booking.time))
    .filter((index) => index >= 0);

  if (completedIndexes.length === 0) {
    return 0;
  }

  return Math.max(...completedIndexes) + 1;
}

function simulateSchedule(bookings: Booking[], currentWater: number) {
  let water = currentWater;

  const refillSlots: string[] = [];

  const startIndex = getFirstFutureSlotIndex(bookings);

  for (let i = startIndex; i < TIME_SLOTS.length; i++) {
    const slot = TIME_SLOTS[i];

    const booking = bookings.find(
      (booking) => booking.time === slot && !booking.completed,
    );

    if (booking) {
      if (water < booking.waterUsage) {
        return {
          valid: false,
          waterLeft: water,
          refillSlots,
        };
      }

      water -= booking.waterUsage;

      continue;
    }

    let nextBooking: Booking | undefined;

    for (let j = i + 1; j < TIME_SLOTS.length; j++) {
      nextBooking = bookings.find(
        (booking) => booking.time === TIME_SLOTS[j] && !booking.completed,
      );

      if (nextBooking) {
        break;
      }
    }

    if (
      nextBooking &&
      (water < nextBooking.waterUsage || water < MINIMUM_USABLE_WATER)
    ) {
      refillSlots.push(slot);
      water = VAN_CAPACITY;
    }
  }

  return {
    valid: true,
    waterLeft: water,
    refillSlots,
  };
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  const [currentWater, setCurrentWater] = useState(INITIAL_WATER);

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(
    EMPTY_CUSTOMER_DETAILS,
  );

  useEffect(() => {
    const unsubscribe = subscribeToBookings((firebaseBookings) => {
      const initialBookingsWithoutConflicts = INITIAL_BOOKINGS.filter(
        (initialBooking) =>
          !firebaseBookings.some(
            (firebaseBooking) => firebaseBooking.time === initialBooking.time,
          ),
      );

      setBookings([...initialBookingsWithoutConflicts, ...firebaseBookings]);
    });

    return unsubscribe;
  }, []);

  const schedule = simulateSchedule(bookings, currentWater);

  const isTimeAvailable = (time: string, waterUsage: number) => {
    const startIndex = getFirstFutureSlotIndex(bookings);

    const timeIndex = TIME_SLOTS.indexOf(time);

    if (timeIndex < startIndex) {
      return false;
    }

    const alreadyBooked = bookings.some((booking) => booking.time === time);

    if (alreadyBooked) {
      return false;
    }

    const candidate: Booking = {
      id: "candidate",
      time,
      service: "",
      carSize: "",
      waterUsage,
      completed: false,
    };

    const testBookings = [...bookings, candidate];

    const testResult = simulateSchedule(testBookings, currentWater);

    return testResult.valid;
  };

  const addBooking = async (newBooking: NewBooking) => {
    if (!isTimeAvailable(newBooking.time, newBooking.waterUsage)) {
      return false;
    }

    try {
      const id = await saveBookingToFirestore(newBooking);

      const booking: Booking = {
        ...newBooking,
        id,
        completed: false,
      };

      setBookings((currentBookings) => {
        const alreadyExists = currentBookings.some(
          (currentBooking) =>
            currentBooking.id === booking.id ||
            currentBooking.time === booking.time,
        );

        if (alreadyExists) {
          return currentBookings;
        }

        return [...currentBookings, booking];
      });

      return true;
    } catch (error) {
      console.error("Kunne ikke gemme booking:", error);

      return false;
    }
  };

  const deleteBooking = async (bookingId: string) => {
    try {
      await deleteBookingFromFirestore(bookingId);

      setBookings((currentBookings) =>
        currentBookings.filter((booking) => booking.id !== bookingId),
      );

      return true;
    } catch (error) {
      console.error("Kunne ikke slette booking:", error);

      return false;
    }
  };

  const refillWater = () => {
    setCurrentWater(VAN_CAPACITY);
  };

  const clearCustomerDetails = () => {
    setCustomerDetails(EMPTY_CUSTOMER_DETAILS);
  };

  const resetDemo = async () => {
    try {
      await deleteAllFirebaseBookings();

      setBookings(INITIAL_BOOKINGS);
      setCurrentWater(INITIAL_WATER);
      clearCustomerDetails();
    } catch (error) {
      console.error("Kunne ikke nulstille demo:", error);
    }
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        currentWater,
        projectedWater: schedule.waterLeft,
        refillSlots: schedule.refillSlots,

        customerDetails,
        setCustomerDetails,
        clearCustomerDetails,

        addBooking,
        deleteBooking,
        refillWater,
        resetDemo,
        isTimeAvailable,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBookings skal bruges inde i BookingProvider");
  }

  return context;
}
