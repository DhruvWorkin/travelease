import { supabase } from "./supabase";
import { Database } from "@/types/supabase";

// Tours API
export async function getTours() {
  try {
    const { data, error } = await supabase
      .from("tours")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching tours:", error);
    throw error;
  }
}

export async function getTourById(id: string) {
  try {
    const { data, error } = await supabase
      .from("tours")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching tour with id ${id}:`, error);
    throw error;
  }
}

// Bookings API
export async function createBooking(
  booking: Database["public"]["Tables"]["bookings"]["Insert"],
) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .insert(booking)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

export async function getUserBookings(userId: string) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select(
        `
        *,
        tours:tour_id(*)
      `,
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching bookings for user ${userId}:`, error);
    throw error;
  }
}

// Reviews API
export async function createReview(
  review: Database["public"]["Tables"]["reviews"]["Insert"],
) {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .insert(review)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
}

export async function getTourReviews(tourId: string) {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .select(
        `
        *,
        profiles:user_id(name, avatar_url)
      `,
      )
      .eq("tour_id", tourId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching reviews for tour ${tourId}:`, error);
    throw error;
  }
}

// Profile API
export async function updateProfile(
  userId: string,
  profile: Partial<Database["public"]["Tables"]["profiles"]["Update"]>,
) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update(profile)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating profile for user ${userId}:`, error);
    throw error;
  }
}

export async function getProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching profile for user ${userId}:`, error);
    throw error;
  }
}
