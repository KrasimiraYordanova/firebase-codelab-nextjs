"use server";

import { addReviewToRestaurant } from "@/src/lib/firebase/firestore.js";
import { getAuthenticatedAppForUser } from "@/src/lib/firebase/serverApp.js";
import { getFirestore } from "firebase/firestore";

// This is a Server Action
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
// Replace the function below
// This is a next.js server action, which is an alpha feature, so
// use with caution.
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
export async function handleReviewFormSubmission(data) {
  const restaurantId = data.get("restaurantId");
  const text = data.get("text");
  const rating = data.get("rating");
  const userId = data.get("userId");

  console.log("Received form data in server action:", {
  restaurantId: data.get("restaurantId"),
  text: data.get("text"),
  rating: data.get("rating"),
  userId: data.get("userId"),
});

  if (!restaurantId || !text || !rating || !userId) {
    throw new Error("Incomplete form data provided.");
  }

  try {
    const { app } = await getAuthenticatedAppForUser();
    const db = getFirestore(app);

    await addReviewToRestaurant(db, restaurantId, {
      text,
      rating: Number(rating), // Convert rating to a number explicitly
      userId,
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    throw new Error("Failed to submit review. Please try again later.");
  }
}
