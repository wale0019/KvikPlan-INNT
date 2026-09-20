import { createContext, ReactNode, useContext, useState } from "react";

import {
  Booking,
  INITIAL_BOOKINGS,
  MINIMUM_USABLE_WATER,
  TIME_SLOTS,
  VAN_CAPACITY,
} from "../data/data";

type NewBooking = {
  time: string;
  service: string;
  carSize: string;
  waterUsage: number;
};

type BookingContextType = {
  bookings: Booking[];
  currentWater: number;
  projectedWater: number;
  refillSlots: string[];

  addBooking: (booking: NewBooking) => boolean;
  refillWater: () => void;
  resetDemo: () => void;

  isTimeAvailable: (time: string, waterUsage: number) => boolean;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

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

  const addBooking = (newBooking: NewBooking) => {
    if (!isTimeAvailable(newBooking.time, newBooking.waterUsage)) {
      return false;
    }

    const booking: Booking = {
      ...newBooking,
      id: Date.now().toString(),
      completed: false,
    };

    setBookings((currentBookings) => [...currentBookings, booking]);

    return true;
  };

  const refillWater = () => {
    setCurrentWater(VAN_CAPACITY);
  };

  const resetDemo = () => {
    setBookings(INITIAL_BOOKINGS);
    setCurrentWater(INITIAL_WATER);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        currentWater,
        projectedWater: schedule.waterLeft,
        refillSlots: schedule.refillSlots,

        addBooking,
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
