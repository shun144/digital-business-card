import { type Tables } from "@/lib/supabase/schema";
import { fetchUser } from "@/lib/supabase/supabaseFunction";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const Cards = () => {
  const [user, setUser] = useState<Tables<"users"> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        setIsLoading(true);
        const fetchedUser = await fetchUser(id);
        console.log(fetchedUser);
        // setUser(fetchedUser);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <div>Loading中</div>;
  }

  return (
    <div>
      {user ? (
        <div>
          <div>{user.name}</div>
        </div>
      ) : (
        <div>該当するユーザが存在しません</div>
      )}
    </div>
  );
};

export default Cards;
