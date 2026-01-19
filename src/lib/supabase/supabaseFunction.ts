import { type Tables } from "@/lib/supabase/schema";
import { supabase } from "./supabase";

export const fetchAllUsers = async (): Promise<Tables<"users">[]> => {
  const res = await supabase.from("users").select("*");

  if (res.error) {
    throw new Error(res.error.message);
  }

  return res.data;
};
