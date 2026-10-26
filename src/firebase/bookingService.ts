import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";

import { Booking } from "../data/data";
import { db } from "./firebaseConfig";

export type NewFirebaseBooking = {
  name: string;
  phone: string;
  address: string;
  service: string;
  carSize: string;
  time: string;
  waterUsage: number;
};

export async function saveBookingToFirestore(booking: NewFirebaseBooking) {
  const docRef = await addDoc(collection(db, "bookings"), {
    ...booking,
    completed: false,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

export function subscribeToBookings(
  onBookings: (bookings: Booking[]) => void,
  onError?: (error: Error) => void,
) {
  return onSnapshot(
    collection(db, "bookings"),

    (snapshot) => {
      const bookings: Booking[] = snapshot.docs.map((document) => {
        const data = document.data();

        return {
          id: document.id,
          time: data.time ?? "",
          service: data.service ?? "",
          carSize: data.carSize ?? "",
          waterUsage: Number(data.waterUsage ?? 0),
          completed: Boolean(data.completed),
          name: data.name ?? "",
          phone: data.phone ?? "",
          address: data.address ?? "",
        };
      });

      onBookings(bookings);
    },

    (error) => {
      console.error("Fejl ved hentning af Firebase-bookinger:", error);

      onError?.(error);
    },
  );
}

export async function deleteBookingFromFirestore(bookingId: string) {
  await deleteDoc(doc(db, "bookings", bookingId));
}

export async function deleteAllFirebaseBookings() {
  const snapshot = await getDocs(collection(db, "bookings"));

  const batch = writeBatch(db);

  snapshot.docs.forEach((document) => {
    batch.delete(document.ref);
  });

  await batch.commit();
}
