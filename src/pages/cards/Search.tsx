import {
  Box,
  Button,
  Field,
  Heading,
  Stack,
  Input,
  HStack,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

interface SearchFormProps {
  searchId: string;
}

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormProps>();

  const navigate = useNavigate();

  const onSubmit = useCallback(
    handleSubmit((formData) => {
      const destinationPath = `/cards/${formData.searchId}`;
      navigate(destinationPath);
    }),
    [],
  );

  const clickToRegister = useCallback(() => {
    navigate("/cards/register");
  }, []);

  return (
    <Stack align={"center"} justify={"center"} px="24px" py="48px">
      <Heading>名刺検索</Heading>
      <Stack
        minW="350px"
        minH="200px"
        p="24px"
        bg="white"
        rounded={"sm"}
        shadow={"md"}
        justify={"space-between"}
      >
        <form id="search-card" onSubmit={onSubmit}>
          <HStack>
            <Field.Root
              invalid={!!errors.searchId}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <Field.Label htmlFor="searchId" fontSize={"md"}>
                ID
              </Field.Label>
              <Input
                id="searchId"
                placeholder="coffee"
                {...register("searchId", {
                  required: "ユーザIDを入力してください",
                })}
              />
              <Field.ErrorText>
                {errors.searchId && errors.searchId.message}
              </Field.ErrorText>
            </Field.Root>
            <Button
              type="submit"
              form="search-card"
              variant="solid"
              loading={isSubmitting}
            >
              検索
            </Button>
          </HStack>
        </form>

        <Button onClick={clickToRegister}>新規登録はこちら</Button>
      </Stack>
    </Stack>
  );
};

export default Search;
