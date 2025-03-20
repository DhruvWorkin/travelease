import { supabase } from "./supabase";

export type AuthUser = {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
};

export async function signUp(email: string, password: string, name: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) throw error;
    return { user: data.user, session: data.session };
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { user: data.user, session: data.session };
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return null;

    return {
      id: data.user.id,
      email: data.user.email || "",
      name: data.user.user_metadata?.name,
      avatar_url: data.user.user_metadata?.avatar_url,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
}
