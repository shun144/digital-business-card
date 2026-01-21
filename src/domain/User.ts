import { type Database } from "@/lib/supabase/schema";

export class User {
  userId: string;
  userName: string;
  description: string;
  githubUrl: string | null;
  qiitaUrl: string | null;
  xUrl: string | null;
  skillName: string;

  constructor(
    _user_id: string,
    _user_name: string,
    _description: string,
    _github_id: string | null,
    _qiita_id: string | null,
    _x_id: string | null,
    _skill_name: string,
  ) {
    this.userId = _user_id;
    this.userName = _user_name;
    this.description = _description;
    this.githubUrl = this.#idConvertUrl(_github_id, "https://github.com");
    this.qiitaUrl = this.#idConvertUrl(_qiita_id, "https://qiita.com");
    this.xUrl = this.#idConvertUrl(_x_id, "https://x.com");
    this.skillName = _skill_name;
  }

  #idConvertUrl(id: string | null, host: string) {
    if (!id) return null;
    return `${host}/${id}`;
  }
}
