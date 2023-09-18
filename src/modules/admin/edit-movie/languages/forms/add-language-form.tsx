import { Box, Button, Stack, TextField } from "@mui/material";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "react-query";
import { addLanguage } from "modules/admin/admin-fetch";
export type AddLanguageFields = {
  language: string;
};
const defaultValues = {
  language: "",
};
export const AddLanguageForm = ({
  onClose,
  seasonId,
  movieId,
  episodeId,
}: {
  onClose: () => void;
  seasonId: string;
  movieId: string;
  episodeId: string;
}) => {
  const schema = yup.object().shape({
    language: yup.string().required(),
  });
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddLanguageFields>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const queryClient = useQueryClient();
  const $addLanguage = useMutation(addLanguage);
  const onSubmit = (language: AddLanguageFields) => {
    $addLanguage.mutate(
      { language, movieId, seasonId, episodeId },
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
          <Button fullWidth type="submit" disabled={$addLanguage.isLoading}>
            დამატება
          </Button>
          <Button fullWidth onClick={onClose} color="error" variant="outlined">
            გაუქმება
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
