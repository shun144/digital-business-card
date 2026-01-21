import { Box, Button, Field, Heading, HStack, Input } from "@chakra-ui/react";
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

  return (
    <>
      <Heading>名刺検索</Heading>
      <Box w="250px" p="24px" bg="white" rounded={"sm"} shadow={"md"}>
        <form id="search-card" onSubmit={onSubmit}>
          <Field.Root invalid={!!errors.searchId}>
            <Field.Label>ID</Field.Label>
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
        </form>
      </Box>
    </>
  );
};

export default Search;
