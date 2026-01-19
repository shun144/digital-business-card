import { fetchAllUsers } from "@/lib/supabase/supabaseFunction";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

const Cards = () => {
  const navigation = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const fetchedUsers = await fetchAllUsers();
        console.log({ fetchedUsers });
      } catch (error) {}
    })();
  }, []);

  return <div>{`id:${id}`}</div>;
};

export default Cards;
