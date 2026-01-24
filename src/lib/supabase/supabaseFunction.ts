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

  return users;
};

interface RegisterArgs {
  englishWord: string;
  userName: string;
  description: string;
  skill: number[];
  githubId: string;
  qiitaId: string;
  xId: string;
}

export const insertUser = async (args: RegisterArgs) => {
  const { error: userError, data: userData } = await supabase
    .from("users")
    .insert({
      id: args.englishWord,
      name: args.userName,
      description: args.description,
      github_id: args.githubId,
      x_id: args.xId,
      qiita_id: args.qiitaId,
    })
    .select("*");

  if (userData === null || userData.length === 0) return;

  const { error: userSkillError, data: userSkillData } = await supabase
    .from("user_skill")
    .insert({
      user_id: userData[0].id,
      skill_id: args.skill[0],
    })
    .select("*");
};
