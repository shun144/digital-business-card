import { type User } from "@/domain/User";
import {
  Button,
  Card as ChakraCard,
  HStack,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { memo, useCallback, type FC } from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { useNavigate } from "react-router";

interface Props {
  user: User;
}

const Card: FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const clickBackBtn = useCallback(() => {
    navigate("/cards/id");
  }, []);

  return (
    <Stack>
      <ChakraCard.Root w="250px" maxW="sm" shadow={"md"}>
        <ChakraCard.Header>
          <ChakraCard.Title fontSize={"xl"}>{user.userName}</ChakraCard.Title>
        </ChakraCard.Header>
        <ChakraCard.Body>
          <Stack gap="4" w="full">
            <Stack gap="0">
              <Text fontWeight="bold">自己紹介</Text>
              <Text dangerouslySetInnerHTML={{ __html: user.description }} />
            </Stack>

            <Stack gap="0">
              <Text fontWeight="bold">好きな技術</Text>
              <Text>{user.skillName}</Text>
            </Stack>

            <HStack justify={"space-between"}>
              <Link
                _focus={{ outline: "none" }}
                target="_blank"
                rel="noopener noreferrer"
                href={`${user.githubUrl}`}
                aria-label="Githubリンク"
              >
                <FaGithub size={24} />
              </Link>
              <Link
                _focus={{ outline: "none" }}
                target="_blank"
                rel="noopener noreferrer"
                href={`${user.qiitaUrl}`}
                aria-label="Qiitaリンク"
              >
                <MdOutlineLibraryBooks size={24} />
              </Link>
              <Link
                _focus={{ outline: "none" }}
                target="_blank"
                rel="noopener noreferrer"
                href={`${user.xUrl}`}
                aria-label="Xリンク"
              >
                <BsTwitterX size={24} />
              </Link>
            </HStack>
          </Stack>
        </ChakraCard.Body>
      </ChakraCard.Root>

      <Button onClick={clickBackBtn}>戻る</Button>
    </Stack>
  );
};

export default memo(Card);
