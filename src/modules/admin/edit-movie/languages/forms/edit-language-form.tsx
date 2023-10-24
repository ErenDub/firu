import { Box, Button, Stack, TextField } from "@mui/material";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "react-query";
import { editLanguage } from "modules/admin/admin-fetch";
export type EditLanguageFields = {
  language: string;
};

export const EditLanguageForm = ({
  onClose,
  languageId,
  defaultValues,
}: {
  onClose: () => void;
  languageId: string;
  defaultValues: EditLanguageFields;
}) => {
  const schema = yup.object().shape({
    language: yup.string().required(),
  });
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EditLanguageFields>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const queryClient = useQueryClient();
  const $editLanguage = useMutation(editLanguage);
  const onSubmit = (language: EditLanguageFields) => {
    $editLanguage.mutate(
      { language, languageId },
      {
        onSuccess: (movieId) => {
          queryClient.invalidateQueries({ active: true });
          reset(defaultValues, { keepDirty: false });
          onClose();
        },
      }
    );
  };
  return (
    <Box width={{ md: 500, xs: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <Controller
            control={control}
            name="language"
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="ენა"
                type="text"
                required
                helperText={error?.message}
                error={!!errors.language}
                {...field}
              />
            )}
          />
        </Stack>
        <Stack mt={2} direction={{ md: "row", xs: "column" }} gap={2}>
          <Button fullWidth type="submit" disabled={$editLanguage.isLoading}>
            რედაქტირება
          </Button>
          <Button fullWidth onClick={onClose} color="error" variant="outlined">
            გაუქმება
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
