import { Button, Dialog, Field, Input, Portal, Stack } from "@chakra-ui/react";
import { memo } from "react";
import { useFormContext } from "react-hook-form";

export type RegisterDialogValues = {
  example: string;
};

const RegisterDialog = () => {
  console.log("RegisterDialog.tsx");
  const { handleSubmit, register } = useFormContext<RegisterDialogValues>();

  const onSubmit = handleSubmit((e) => console.log(e.example));
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">新規登録画面</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>新規登録</Dialog.Title>
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

export default memo(RegisterDialog);
