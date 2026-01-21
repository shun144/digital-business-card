import Card from "@/components/molecules/Card";
import { type User } from "@/domain/User";
import { fetchUser } from "@/lib/supabase/supabaseFunction";
import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Cards = () => {
  const { id } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const fetchedUser = await fetchUser(id);
        setUsers(fetchedUser);
        setIsLoading(false);
      } catch (error) {
      } finally {
      }
    })();
  }, []);

  if (isLoading) {
    return <div>Loading中</div>;
  }

  if (users.length === 0) {
    return <div>該当するユーザが存在しません</div>;
  }

  return (
    <Flex align={"center"} justify={"center"} px="24px" py="48px">
      {users.map((user) => (
        <Card key={user.userId} user={user} />
      ))}
    </Flex>
  );
};

export default Cards;
