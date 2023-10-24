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
import { editResolution } from "modules/admin/admin-fetch";
export type EditResolutionFields = {
  player: boolean;
  resolution: string;
  url: string;
};

export const EditResolutioeForm = ({
  onClose,

  resolutionId,
  defaultValues,
}: {
  onClose: () => void;

  resolutionId: string;
  defaultValues: EditResolutionFields;
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
    watch,
    formState: { errors },
  } = useForm<EditResolutionFields>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const queryClient = useQueryClient();
  const $editResolution = useMutation(editResolution);
  const onSubmit = (resolution: EditResolutionFields) => {
    $editResolution.mutate(
      { resolution, resolutionId },
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
                control={<Switch checked={watch("player")} />}
                label="ჩვენი პლეერი: "
                labelPlacement="start"
                {...field}
              />
            )}
          />
        </Stack>
        <Stack mt={2} direction={{ md: "row", xs: "column" }} gap={2}>
          <Button fullWidth type="submit" disabled={$editResolution.isLoading}>
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
