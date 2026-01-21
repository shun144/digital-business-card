import { Button, Dialog, Field, Input, Portal, Stack } from "@chakra-ui/react";
import { memo, useRef } from "react";
import { useForm, type SubmitHandler, useFormContext } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

const EditDialog = () => {
  console.log("編集ダイアログ");
  const ref = useRef<HTMLInputElement | null>(null);

  const { handleSubmit, register } = useFormContext<Inputs>();

  const onSubmit = handleSubmit((e) => console.log(e.example));

  return (
    <Dialog.Root initialFocusEl={() => ref.current}>
      <Dialog.Trigger asChild>
        <Button variant="outline">編集</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>編集画面</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="4">
                <form onSubmit={onSubmit}>
                  <Field.Root>
                    <Field.Label>name</Field.Label>
                    <Input {...register("example")} />
                    <Field.ErrorText>This is an error text</Field.ErrorText>
                  </Field.Root>
                </form>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Button>Save</Button>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default memo(EditDialog);
