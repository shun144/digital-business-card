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
  const usersQuery = await supabase
    .from("users")
    .select("id, name, description, github_id, qiita_id, x_id")
    .eq("id", userId);

  if (usersQuery.error) {
    throw new Error(usersQuery.error.message);
  }

  const userWithSkillQuery = await supabase
    .from("user_skill")
    .select("skill_id")
    .eq("user_id", userId);

  if (userWithSkillQuery.error) {
    throw new Error(userWithSkillQuery.error.message);
  }

  const skillsQuery = await supabase
    .from("skills")
    .select("name")
    .in(
      "id",
      userWithSkillQuery.data.flatMap((x) => x.skill_id),
    );

  if (skillsQuery.error) {
    throw new Error(skillsQuery.error.message);
  }

  const userData = usersQuery.data[0];
  const user = new User(
    userData.id,
    userData.name,
    userData.description,
    userData.github_id,
    userData.qiita_id,
    userData.x_id,
    skillsQuery.data.map((x) => x.name),
  );

  return [user];
};

export const deleteUserCreatedTheDayBefore = async () => {
  const yesterdayFrom = new Date();
  yesterdayFrom.setDate(yesterdayFrom.getDate() - 1);
  yesterdayFrom.setUTCHours(0, 0, 0, 0);

  const yesterDayTo = new Date();
  yesterDayTo.setDate(yesterDayTo.getDate() - 1);
  yesterDayTo.setUTCHours(23, 59, 59, 999);

  const querySelectUsers = await supabase
    .from("users")
    .select("id")
    .gte("created_at", yesterdayFrom.toUTCString())
    .lte("created_at", yesterDayTo.toUTCString());

  if (querySelectUsers.error) {
    throw new Error("ユーザー情報の取得に失敗しました");
  }

  const deleteUsers = querySelectUsers.data.map((x) => x.id);

  if (deleteUsers.length === 0) {
    console.log("削除対象ユーザは0件");
  }

  const queryDeleteUserSkill = await supabase
    .from("user_skill")
    .delete()
    .in("user_id", deleteUsers);

  const queryDeleteUsers = await supabase
    .from("users")
    .delete()
    .in("id", deleteUsers);

  if (!queryDeleteUserSkill.error && !queryDeleteUsers.error) {
    console.log("削除完了", deleteUsers.length);
  }
};

// export const fetchUser = async (userId: string) => {
//   const userWithSkillQuery = await supabase
//     .from("user_skill")
//     .select(
//       "users (id, name, description, github_id, qiita_id, x_id), skills (name)",
//     )
//     .eq("user_id", userId);

//   if (userWithSkillQuery.error) {
//     throw new Error(userWithSkillQuery.error.message);
//   }

//   if (userWithSkillQuery.data.length === 0) {
//     throw new Error("該当のユーザーは存在しません");
//   }

//   const users = userWithSkillQuery.data.map((x) => {
//     return new User(
//       x.users.id,
//       x.users.name,
//       x.users.description,
//       x.users.github_id,
//       x.users.qiita_id,
//       x.users.x_id,
//       x.skills.name,
//     );
//   });

//   return users;
// };

interface RegisterArgs {
  englishWord: string;
  userName: string;
  description: string;
  skills: number[];
  githubId: string;
  qiitaId: string;
  xId: string;
}

export const insertUser = async (args: RegisterArgs) => {
  const { error } = await supabase.rpc("insert_user_and_userskill", {
    _user_id: args.englishWord,
    _name: args.userName,
    _description: args.description,
    _skills: args.skills,
  });

  if (error) {
    // → PostgreSQLのraiseで指定したエラーメッセージがここに出る
    console.error("登録エラー:", error.message);
  } else {
    // → 正常終了時は error が null で、data も null
    console.log("登録成功！");
  }
};
// export const insertUser = async (args: RegisterArgs) => {
//   const { error: userError, data: userData } = await supabase
//     .from("users")
//     .insert({
//       id: args.englishWord,
//       name: args.userName,
//       description: args.description,
//       github_id: args.githubId,
//       x_id: args.xId,
//       qiita_id: args.qiitaId,
//     })
//     .select("*");

//   if (userData === null || userData.length === 0) return;

//   const { error: userSkillError, data: userSkillData } = await supabase
//     .from("user_skill")
//     .insert({
//       user_id: userData[0].id,
//       skill_id: args.skills,
//     })
//     .select("*");
// };
