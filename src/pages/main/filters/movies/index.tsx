import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Slider,
  Stack,
  TextField,
} from "@mui/material";
import { useAuthContext } from "lib/providers/login-provider/context/authContext";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "react-query";

import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  getCategories,
  getDirectors,
  getStudios,
  getTags,
} from "modules/admin/admin-fetch";
import { MainLayout } from "global/layouts/mainLayout";
function valuetext(value: number) {
  return `${value}°C`;
}
const countries = ["აშშ", "იაპონია", "კორეა", "ჩინეთი", "საფრანგეთი", "კანადა"];
const ageLimits = ["G", "PG", "PG-13", "R", "X"];

export type AddMovieFields = {
  year: Array<number>;
  directors: Array<string>;
  studios: Array<string>;
  country: string;
  age: string;
  categories: Array<string>;
};

const marks = [
  {
    value: 1980,
    label: "1980",
  },
  {
    value: 2000,
    label: "2000",
  },
  {
    value: 2010,
    label: "2010",
  },
  {
    value: new Date().getFullYear(),
    label: `${new Date().getFullYear()}`,
  },
];
const Movies = () => {
  const { access } = useAuthContext();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddMovieFields>({
    defaultValues: {
      year: [1980, new Date().getFullYear()],
      directors: [],
      studios: [],
      country: "",
      age: "",
      categories: [],
    },
  });

  const $directors = useQuery("directors", getDirectors);
  const $studios = useQuery("studios", getStudios);
  const $categorues = useQuery("categories", getCategories);

  const onSubmit = (movie: AddMovieFields) => {
    console.log(movie);
  };
  return (
    <MainLayout>
      <Box mt={15}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" gap={{ md: 4, xs: 2 }}>
            <Stack
              direction={{ sx: "row", md: "row", sm: "column", xs: "column" }}
              gap={2}
            >
              <Controller
                control={control}
                name="country"
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      ქვეყანა
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      error={!!errors.country}
                      {...field}
                      label="ქვეყანა"
                    >
                      {countries.map((country) => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{error?.message}</FormHelperText>
                  </FormControl>
                )}
              />
              {$directors.isLoading && <Skeleton height={55} />}
              {$directors.data && (
                <Controller
                  control={control}
                  name="directors"
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      id="tags-filled"
                      options={$directors.data.map((option) => option)}
                      fullWidth
                      value={field.value} // Pass the field.value as the value
                      onChange={(event, newValue) => {
                        field.onChange(newValue); // Call field.onChange with the new value
                      }}
                      renderTags={(value: readonly string[], getTagProps) =>
                        value.map((option: string, index: number) => (
                          <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="filled"
                          fullWidth
                          label="რეჟისორები"
                          error={!!errors.directors}
                        />
                      )}
                    />
                  )}
                />
              )}
              {$studios.isLoading && <Skeleton height={55} />}
              {$studios.data && (
                <Controller
                  control={control}
                  name="studios"
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      id="tags-filled"
                      options={$studios.data.map((option) => option)}
                      fullWidth
                      value={field.value} // Pass the field.value as the value
                      onChange={(event, newValue) => {
                        field.onChange(newValue); // Call field.onChange with the new value
                      }}
                      renderTags={(value: readonly string[], getTagProps) =>
                        value.map((option: string, index: number) => (
                          <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="filled"
                          fullWidth
                          label="სტუდიები"
                          error={!!errors.studios}
                        />
                      )}
                    />
                  )}
                />
              )}

              <Controller
                control={control}
                name="age"
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      ასაკობრივი შეზღუდვა
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      error={!!errors.age}
                      {...field}
                      label="ასაკობრივი შეზღუდვა"
                    >
                      {ageLimits.map((ageLimit) => (
                        <MenuItem key={ageLimit} value={ageLimit}>
                          {ageLimit}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{error?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Stack>
            <Stack
              direction={{ sx: "row", md: "row", sm: "column", xs: "column" }}
              gap={4}
              alignItems="center"
            >
              {$categorues.isLoading && <Skeleton height={55} />}
              {$categorues.data && (
                <Controller
                  control={control}
                  name="categories"
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      fullWidth
                      id="tags-filled"
                      options={$categorues.data.map((option) => option)}
                      value={field.value} // Pass the field.value as the value
                      onChange={(event, newValue) => {
                        field.onChange(newValue); // Call field.onChange with the new value
                      }}
                      renderTags={(value: readonly string[], getTagProps) =>
                        value.map((option: string, index: number) => (
                          <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="filled"
                          label="კატეგორიები"
                          error={!!errors.categories}
                        />
                      )}
                    />
                  )}
                />
              )}
              <Controller
                control={control}
                name="year"
                render={({ field, fieldState: { error } }) => (
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    {...field}
                    min={1980}
                    max={new Date().getFullYear()}
                    valueLabelDisplay="on"
                    marks={marks}
                    getAriaValueText={valuetext}
                  />
                )}
              />
            </Stack>

            <Stack direction="row">
              <Button
                fullWidth
                type="submit"
                // disabled={$addNewMovie.isLoading}
              >
                გაფილტვრა
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </MainLayout>
  );
};
export default Movies;
