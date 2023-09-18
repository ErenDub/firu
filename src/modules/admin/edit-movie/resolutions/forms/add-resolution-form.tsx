import {
  Box,
  Button,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "react-query";
import { addResolution } from "modules/admin/admin-fetch";
export type AddResolutionFields = {
  player: boolean;
  resolution: string;
  url: string;
};
const defaultValues = {
  player: true,
  resolution: "",
  url: "",
};
export const AddResolutioeForm = ({
  onClose,
  seasonId,
  movieId,
  episodeId,
  languageId,
}: {
  onClose: () => void;
  seasonId: string;
  movieId: string;
  episodeId: string;
  languageId: string;
}) => {
  const schema = yup.object().shape({
    player: yup.boolean().required(),
    resolution: yup.string().required(),
    url: yup.string().required(),
  });
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddResolutionFields>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const queryClient = useQueryClient();
  const $addResolution = useMutation(addResolution);
  const onSubmit = (resolution: AddResolutionFields) => {
    $addResolution.mutate(
      { resolution, movieId, seasonId, episodeId, languageId },
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
            name="url"
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="სერია"
                type="text"
                required
                helperText={error?.message}
                error={!!errors.url}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="resolution"
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="რეოლუცია"
                type="text"
                required
                helperText={error?.message}
                error={!!errors.resolution}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="player"
            render={({ field, fieldState: { error } }) => (
              <FormControlLabel
                control={<Switch />}
                label="ჩვენი პლეერი: "
                labelPlacement="start"
                {...field}
              />
            )}
          />
        </Stack>
        <Stack mt={2} direction={{ md: "row", xs: "column" }} gap={2}>
          <Button fullWidth type="submit" disabled={$addResolution.isLoading}>
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
