import { type Tables } from "@/lib/supabase/schema";
import { supabase } from "./supabase";
import { User } from "@/domain/User";

export const fetchAllUsers = async (): Promise<Tables<"users">[]> => {
  const res = await supabase.from("users").select("*");

  if (res.error) {
    throw new Error(res.error.message);
  }

  return res.data;
};

export const fetchUser = async (userId: string) => {
  // const usersQuery = await supabase.from("users").select("*").eq("id", userId);

  const userWithSkillQuery = await supabase
    .from("user_skill")
    .select(
      "users (id, name, description, github_id, qiita_id, x_id), skills (name)",
    )
    .eq("user_id", userId);

  if (userWithSkillQuery.error) {
    throw new Error(userWithSkillQuery.error.message);
  }

  if (userWithSkillQuery.data.length === 0) {
    throw new Error("該当のユーザーは存在しません");
  }

  const users = userWithSkillQuery.data.map((x) => {
    return new User(
      x.users.id,
      x.users.name,
      x.users.description,
      x.users.github_id,
      x.users.qiita_id,
      x.users.x_id,
      x.skills.name,
    );
  });

  // const user = new User(
  //   userWithSkillQuery.data[0].users.id,
  //   userWithSkillQuery.data[0].users.name,
  //   userWithSkillQuery.data[0].users.description,
  //   userWithSkillQuery.data[0].users.github_id,
  //   userWithSkillQuery.data[0].users.qiita_id,
  //   userWithSkillQuery.data[0].users.x_id,
  //   userWithSkillQuery.data[0].skills.name,
  // );

  return users;
};
