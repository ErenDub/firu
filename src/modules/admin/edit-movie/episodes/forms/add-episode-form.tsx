import { Box, Button, Stack, TextField } from "@mui/material";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "react-query";
import { addEpisode } from "modules/admin/admin-fetch";
export type AddEpisodeFields = {
  title: string;
  duration: number;
  openingStart: number;
  openingEnd: number;
  poster: string;
  end: number;
};
const defaultValues = {
  title: "",
  duration: 0,
  openingStart: 0,
  openingEnd: 0,
  poster: "",
  end: 0,
};
export const AddEpisodeForm = ({
  onClose,
  seasonId,
}: {
  onClose: () => void;
  seasonId: string;
}) => {
  const schema = yup.object().shape({
    title: yup.string().required(),
    duration: yup.number().required(),
    openingStart: yup.number().required(),
    openingEnd: yup.number().required(),
    poster: yup.string().required(),
    end: yup.number().required(),
  });
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddEpisodeFields>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const queryClient = useQueryClient();
  const $addEpisode = useMutation(addEpisode);
  const onSubmit = (episode: AddEpisodeFields) => {
    $addEpisode.mutate(
      { episode, seasonId },
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
            name="title"
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="ეპიზოდის დასახელება"
                type="text"
                required
                helperText={error?.message}
                error={!!errors.title}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="duration"
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="ხანგრძლივობა"
                type="text"
                required
                helperText={error?.message}
                error={!!errors.duration}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="poster"
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="პოსტერი"
                type="text"
                required
                helperText={error?.message}
                error={!!errors.poster}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="openingStart"
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="ოპენინგის დასაწყისი"
                type="text"
                required
                helperText={error?.message}
                error={!!errors.openingStart}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="openingEnd"
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="ოპენინგის დასასრული"
                type="text"
                required
                helperText={error?.message}
                error={!!errors.openingEnd}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="end"
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="დასასრული"
                type="text"
                required
                helperText={error?.message}
                error={!!errors.end}
                {...field}
              />
            )}
          />
        </Stack>
        <Stack mt={2} direction={{ md: "row", xs: "column" }} gap={2}>
          <Button fullWidth type="submit" disabled={$addEpisode.isLoading}>
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
