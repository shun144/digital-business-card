import { type Database } from "@/lib/supabase/schema";

const skillMap: { [key: number]: string } = {
  1: "React",
  2: "Typescript",
  3: "Github",
};

export class User {
  userId: string;
  userName: string;
  description: string;
  githubUrl: string | null;
  qiitaUrl: string | null;
  xUrl: string | null;
  skillNames: string[];

  constructor(
    _user_id: string,
    _user_name: string,
    _description: string,
    _github_id: string | null,
    _qiita_id: string | null,
    _x_id: string | null,
    _skill_name: string[],
  ) {
    this.userId = _user_id;
    this.userName = _user_name;
    this.description = _description;
    this.githubUrl = this.#idConvertUrl(_github_id, "https://github.com");
    this.qiitaUrl = this.#idConvertUrl(_qiita_id, "https://qiita.com");
    this.xUrl = this.#idConvertUrl(_x_id, "https://x.com");
    this.skillNames = _skill_name;
    // this.skillNames = _skill_name.map((x) => skillMap[x]);
  }

  #idConvertUrl(id: string | null, host: string) {
    if (!id) return null;
    return `${host}/${id}`;
  }
}
