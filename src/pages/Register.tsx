import {
  Field,
  HStack,
  Input,
  Link,
  Stack,
  Card as ChakraCard,
  Flex,
  Text,
  Heading,
} from "@chakra-ui/react";
import React, { memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { BsTwitterX } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { MdOutlineLibraryBooks } from "react-icons/md";

interface RegisterProps {
  englishWord: string;
  userName: string;
  description: string;
  skill: string;
  githubId: string;
  qiitaId: string;
  xId: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterProps>();

  const onSubmit = useCallback(
    handleSubmit(() => {
      console.log("kano");
    }),
    [],
  );

  return (
    <Stack align={"center"} justify={"center"} px="24px" py="48px">
      <Heading>新規名刺登録</Heading>

      <ChakraCard.Root w="450px" maxW="sm" shadow={"md"}>
        <ChakraCard.Body>
          <form onSubmit={onSubmit}>
            <Stack gap="8">
              <Field.Root required>
                <Field.Label>好きな英単語</Field.Label>
                <Input
                  id="englishWord"
                  placeholder="coffee"
                  required
                  {...register("englishWord", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <Field.ErrorText>
                  {errors.englishWord && errors.englishWord.message}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root>
                <Field.Label>お名前</Field.Label>
                <Input
                  id="userName"
                  placeholder="coffee"
                  {...register("userName", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <Field.ErrorText>
                  {errors.userName && errors.userName.message}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root>
                <Field.Label>自己紹介</Field.Label>
                <Input
                  id="description"
                  placeholder="coffee"
                  {...register("description", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <Field.ErrorText>
                  {errors.description && errors.description.message}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root>
                <Field.Label>好きな技術</Field.Label>
                <Input
                  id="skill"
                  placeholder="coffee"
                  {...register("skill", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <Field.ErrorText>
                  {errors.skill && errors.skill.message}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root>
                <Field.Label>GitHub ID</Field.Label>
                <Input
                  id="githubId"
                  placeholder="coffee"
                  {...register("githubId", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <Field.ErrorText>
                  {errors.githubId && errors.githubId.message}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root>
                <Field.Label>Qiita ID</Field.Label>
                <Input
                  id="qiitaId"
                  placeholder="coffee"
                  {...register("qiitaId", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <Field.ErrorText>
                  {errors.qiitaId && errors.qiitaId.message}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root>
                <Field.Label>X ID</Field.Label>
                <Input
                  id="xId"
                  placeholder="coffee"
                  {...register("xId", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
                    },
                  })}
                />
                <Field.ErrorText>
                  {errors.xId && errors.xId.message}
                </Field.ErrorText>
              </Field.Root>
            </Stack>
          </form>
        </ChakraCard.Body>
      </ChakraCard.Root>
    </Stack>
  );
};

export default memo(Register);
