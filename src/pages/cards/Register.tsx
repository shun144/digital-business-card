// import { insertUser } from "@/lib/supabase/supabaseFunction";
import { insertUser } from "@/lib/supabase/supabaseFunction";
import {
  Button,
  Card,
  Card as ChakraCard,
  Field,
  Heading,
  Input,
  Portal,
  Select,
  Stack,
  Textarea,
  createListCollection,
} from "@chakra-ui/react";
import { memo, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

interface RegisterProps {
  englishWord: string;
  userName: string;
  description: string;
  skill: number[];
  githubId: string;
  qiitaId: string;
  xId: string;
}

const skillsOptions = createListCollection({
  items: [
    { label: "React", value: 1 },
    { label: "TypeScript", value: 2 },
    { label: "Github", value: 3 },
  ],
});

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterProps>();

  // const onSubmit = handleSubmit(async (formData) => await insertUser(formData));

  const onSubmit = useCallback(
    handleSubmit(async (formData) => {
      try {
        // console.log("★★★0000")
        // console.log(formData.skill)
        // console.log({ formData });
        await insertUser(formData);
        navigate("/");
      } catch (error) { }
    }),
    [],
  );

  return (
    <>
      <Heading>新規名刺登録</Heading>

      <ChakraCard.Root w="450px" maxW="sm" shadow={"md"}>
        <ChakraCard.Body>
          <form onSubmit={onSubmit} id="register">
            <Stack gap="8">
              <Field.Root invalid={!!errors.englishWord}>
                <Field.Label htmlFor="englishWord">好きな英単語</Field.Label>
                <Input
                  id="englishWord"
                  placeholder="coffee"
                  {...register("englishWord", {
                    required: "好きな英単語は必須項目です",
                  })}
                />
                <Field.ErrorText>
                  {errors.englishWord && errors.englishWord.message}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.userName}>
                <Field.Label htmlFor="userName">お名前</Field.Label>
                <Input id="userName" {...register("userName", {
                  required: "お名前は必須項目です",
                })} />
                <Field.ErrorText>
                  {errors.userName && errors.userName.message}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.description}>
                <Field.Label htmlFor="description">自己紹介</Field.Label>
                <Textarea
                  id="description"
                  variant="outline"
                  autoresize
                  placeholder="<h1>HTMLタグも使えます</h1>"
                  {...register("description")}
                />

                <Field.ErrorText>
                  {errors.description && errors.description.message}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.skill}>
                <Field.Label htmlFor="skill">好きな技術</Field.Label>
                <Controller
                  control={control}
                  name="skill"
                  render={({ field, formState }) => (
                    <Select.Root
                      id="skill"
                      multiple
                      onValueChange={({ value }) => field.onChange(value)}
                      onInteractOutside={() => field.onBlur()}
                      variant={"outline"}
                      collection={skillsOptions}
                      invalid={!!formState.errors.skill}
                    >
                      <Select.HiddenSelect data-testid="skill-select" />
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText placeholder="技術を選択してください" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Portal>
                        <Select.Positioner>
                          <Select.Content>
                            {skillsOptions.items.map((skillItem) => (
                              <Select.Item
                                data-testid="opt"
                                item={skillItem}
                                key={skillItem.value}
                              >
                                {skillItem.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                  )}
                />

                <Field.ErrorText>
                  {errors.skill && errors.skill.message}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.githubId}>
                <Field.Label htmlFor="githubId">GitHub ID</Field.Label>
                <Input id="githubId" {...register("githubId")} />
                <Field.ErrorText>
                  {errors.githubId && errors.githubId.message}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.qiitaId}>
                <Field.Label htmlFor="qiitaId">Qiita ID</Field.Label>
                <Input id="qiitaId" {...register("qiitaId")} />
                <Field.ErrorText>
                  {errors.qiitaId && errors.qiitaId.message}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.xId}>
                <Field.Label htmlFor="xId">X ID</Field.Label>
                <Input id="xId" {...register("xId")} placeholder="@は不要" />
                <Field.ErrorText>
                  {errors.xId && errors.xId.message}
                </Field.ErrorText>
              </Field.Root>
            </Stack>
          </form>
        </ChakraCard.Body>
        <Card.Footer justifyContent="flex-end">
          <Button
            type="submit"
            // type="button"
            // onClick={() => navigate("/")}
            form="register"
            variant="solid"
            loading={isSubmitting}
          >
            登録
          </Button>
        </Card.Footer>
      </ChakraCard.Root >
    </>
  );
};

export default memo(Register);
