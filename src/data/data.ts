export type Booking = {
  id: string;
  time: string;
  service: string;
  carSize: string;
  waterUsage: number;
  completed: boolean;
};

export const VAN_CAPACITY = 150;

export const MINIMUM_USABLE_WATER = 40;

export const TIME_SLOTS = ["15:00", "16:00", "17:00", "18:00"];

export const WATER_USAGE = {
  Guld: {
    Lille: 40,
    Mellem: 50,
    Stor: 60,
  },

  Premium: {
    Lille: 55,
    Mellem: 65,
    Stor: 75,
  },

  Diamant: {
    Lille: 65,
    Mellem: 75,
    Stor: 90,
  },
};

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "1",
    time: "15:00",
    service: "Premium",
    carSize: "Mellem",
    waterUsage: 65,
    completed: true,
  },

  {
    id: "2",
    time: "16:00",
    service: "Guld",
    carSize: "Lille",
    waterUsage: 40,
    completed: true,
  },
];
