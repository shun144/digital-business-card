import { deleteUserCreatedTheDayBefore } from "@/lib/supabase/supabaseFunction";

(async () => {
  await deleteUserCreatedTheDayBefore();
})();
