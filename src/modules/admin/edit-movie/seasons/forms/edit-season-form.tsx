import { Box, Button, Stack, TextField } from "@mui/material";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "react-query";
import { editSeason } from "modules/admin/admin-fetch";
export type editSeasonFields = {
  title: string;
};

export const EditSeasonForm = ({
  onClose,
  id,
  defaultValues,
  seasonId,
}: {
  onClose: () => void;
  id: string;
  defaultValues: editSeasonFields;
  seasonId: string;
}) => {
  const schema = yup.object().shape({
    title: yup.string().required(),
  });
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<editSeasonFields>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const queryClient = useQueryClient();
  const $editSeason = useMutation(editSeason);
  const onSubmit = (season: editSeasonFields) => {
    console.log(season);

    $editSeason.mutate(
      { title: season.title, movieId: id, seasonId: seasonId },
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
        <Controller
          control={control}
          name="title"
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="სეზონის დასახელება"
              type="text"
              required
              helperText={error?.message}
              error={!!errors.title}
              {...field}
            />
          )}
        />
        <Stack mt={2} direction={{ md: "row", xs: "column" }} gap={2}>
          <Button fullWidth type="submit" disabled={$editSeason.isLoading}>
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
