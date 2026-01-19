import { type Tables } from "@/lib/supabase/schema";
import { supabase } from "./supabase";

export const fetchAllUsers = async (): Promise<Tables<"users">[]> => {
  const res = await supabase.from("users").select("*");

  if (res.error) {
    throw new Error(res.error.message);
  }

  return res.data;
};

export const fetchUser = async (userId: string) => {
  const res = await supabase.from("users").select("*").eq("id", userId);

  // const res = await supabase
  //   .from("users")
  //   .select("name, user_skill (skill_id)")
  //   .eq("id", userId);

  if (res.error) {
    throw new Error(res.error.message);
  }

  if (res.data.length === 0) {
    return null;
  }

  return res.data[0];
};
