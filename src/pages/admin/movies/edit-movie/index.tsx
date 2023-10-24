import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "react-query";
import {
  editMovie,
  getCategories,
  getDirectors,
  getStudios,
  getTags,
} from "modules/admin/admin-fetch";
import { getEditMovie } from "modules/admin/admin-fetch";
import { useParams } from "react-router-dom";
import { Seasons } from "modules/admin/edit-movie/seasons/seasons";
import { useAuthContext } from "lib/providers/login-provider/context/authContext";
import toast from "react-hot-toast";
import { DeleteMovieDialog } from "modules/admin/edit-movie/delete-movie/delete-movie-dialog";
const countries = ["აშშ", "იაპონია", "კორეა", "ჩინეთი", "საფრანგეთი", "კანადა"];
const ageLimits = ["G", "PG", "PG-13", "R", "X"];
const types = ["ფილმი", "სერიალი", "ანიმე"];
export type editMovieFields = {
  title: string;
  titleEn: string;
  year: number;
  directors: Array<string>;
  studios: Array<string>;
  poster: string;
  banner: string;
  logo: string;
  country: string;
  description: string;
  imdb: string;
  age: string;
  categories: Array<string>;
  tags: Array<string>;
  type: string;
  visible: boolean;
  trailer: string;
  franchise: string;
};
const EditMovie = () => {
  const { movieId } = useParams();

  const schema = yup.object().shape({
    title: yup.string().required(),
    titleEn: yup.string().required(),
    year: yup.number().required(),
    directors: yup.array().of(yup.string().required()).required(),
    studios: yup.array().of(yup.string().required()).required(),
    poster: yup.string().required(),
    banner: yup.string().required(),
    logo: yup.string().required(),
    country: yup.string().required(),
    description: yup.string().required(),
    imdb: yup.string().required(),
    age: yup.string().required(),
    type: yup.string().required(),
    visible: yup.boolean().required(),
    trailer: yup.string().required(),
    franchise: yup.string().required(),
    categories: yup.array().of(yup.string().required()).required(),
    tags: yup.array().of(yup.string().required()).required(),
  });

  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<editMovieFields>({
    defaultValues: {
      title: "",
      titleEn: "",
      year: 2000,
      directors: [],
      studios: [],
      poster: "",
      banner: "",
      logo: "",
      country: "",
      description: "",
      imdb: "",
      age: "",
      visible: false,
      trailer: "",
      franchise: "",
      type: "ფილმი",
      categories: [],
      tags: [],
    },
    resolver: yupResolver(schema),
  });

  const $getEditMovie = useQuery(
    "edit-movie",
    () => getEditMovie({ movieId: movieId ?? "" }),
    {
      onSuccess: (movie) => {
        const formData = (({
          title,
          titleEn,
          year,
          banner,
          logo,
          country,
          description,
          imdb,
          age,
          type,
          directors,
          studios,
          categories,
          trailer,
          franchise,
          tags,
          poster,
          visible,
        }) => ({
          title,
          titleEn,
          year,
          banner,
          logo,
          country,
          description,
          imdb,
          age,
          type,
          directors,
          studios,
          categories,
          trailer,
          franchise,
          tags,
          poster,
          visible,
        }))(movie);
        reset({ ...formData });
      },
    }
  );
  const $addNewMovie = useMutation(editMovie);
  const $tags = useQuery("tags", getTags);
  const $directors = useQuery("directors", getDirectors);
  const $studios = useQuery("studios", getStudios);
  const $categorues = useQuery("categories", getCategories);
  const { access } = useAuthContext();
  const onSubmit = (movie: editMovieFields) => {
    console.log(movie);
    access("edit_movie")
      ? $addNewMovie.mutate({ movie, id: $getEditMovie.data?.id! })
      : toast.error("თქვენ არ გაქვთ წვდომა");
  };
  return (
    <Box>
      {$getEditMovie.isLoading && <Skeleton height={600} />}
      {$getEditMovie.data && (
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" spacing={2}>
              <Stack
                direction={{ sx: "row", md: "row", sm: "column", xs: "column" }}
                gap={2}
              >
                <Controller
                  control={control}
                  name="title"
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      fullWidth
                      label="ფილმის სახელი ქართულად"
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
                  name="titleEn"
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      fullWidth
                      label="ფილმის სახელი ინგლისურად"
                      type="text"
                      required
                      helperText={error?.message}
                      error={!!errors.titleEn}
                      {...field}
                    />
                  )}
                />
              </Stack>
              <Controller
                control={control}
                name="description"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="ფილმის აღწერა"
                    type="text"
                    required
                    multiline
                    minRows={3}
                    helperText={error?.message}
                    error={!!errors.description}
                    {...field}
                  />
                )}
              />

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
                        required
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
                        freeSolo
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
                        freeSolo
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
                  name="year"
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        წელი
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        required
                        error={!!errors.year}
                        {...field}
                        label="წელი"
                      >
                        {Array.from(
                          { length: 50 },
                          (_, index) => new Date().getFullYear() - index
                        ).map((year) => (
                          <MenuItem key={year} value={year}>
                            {year}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{error?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Stack>
              {$categorues.isLoading && <Skeleton height={55} />}
              {$categorues.data && (
                <Controller
                  control={control}
                  name="categories"
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      id="tags-filled"
                      options={$categorues.data.map((option) => option)}
                      freeSolo
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

              <Stack
                direction={{ sx: "row", md: "row", sm: "column", xs: "column" }}
                gap={2}
              >
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
                  name="banner"
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      fullWidth
                      label="ბანერი"
                      type="text"
                      required
                      helperText={error?.message}
                      error={!!errors.banner}
                      {...field}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="logo"
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      fullWidth
                      label="ლოგო"
                      type="string"
                      required
                      helperText={error?.message}
                      error={!!errors.logo}
                      {...field}
                    />
                  )}
                />
              </Stack>
              <Stack
                direction={{ sx: "row", md: "row", sm: "column", xs: "column" }}
                gap={2}
              >
                <Controller
                  control={control}
                  name="imdb"
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      fullWidth
                      label="imdb"
                      type="string"
                      required
                      helperText={error?.message}
                      error={!!errors.imdb}
                      {...field}
                    />
                  )}
                />

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
                        required
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

                <Controller
                  control={control}
                  name="type"
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        ტიპი
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        required
                        error={!!errors.type}
                        {...field}
                        label="ტიპი"
                      >
                        {types.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
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
                gap={2}
              >
                <Controller
                  control={control}
                  name="trailer"
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      fullWidth
                      label="ტრეილერი"
                      type="string"
                      required
                      helperText={error?.message}
                      error={!!errors.trailer}
                      {...field}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="franchise"
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      fullWidth
                      label="ფრენჩიზა"
                      type="string"
                      required
                      helperText={error?.message}
                      error={!!errors.franchise}
                      {...field}
                    />
                  )}
                />
              </Stack>
              {$tags.isLoading && <Skeleton height={55} />}
              {$tags.data && (
                <Controller
                  control={control}
                  name="tags"
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      id="tags-filled"
                      options={$tags.data.map((option) => option)}
                      freeSolo
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
                          label="თეგები"
                          error={!!errors.tags}
                        />
                      )}
                    />
                  )}
                />
              )}
              <Stack
                direction={{ sx: "row", md: "row", sm: "column", xs: "column" }}
                gap={2}
              >
                <Controller
                  control={control}
                  name="visible"
                  render={({ field, fieldState: { error } }) => (
                    <FormControlLabel
                      control={<Switch checked={watch("visible")} />}
                      label="გამოჩენა: "
                      labelPlacement="start"
                      {...field}
                    />
                  )}
                />
              </Stack>
              <Stack direction="row" gap={2}>
                <Button
                  fullWidth
                  type="submit"
                  disabled={$addNewMovie.isLoading}
                >
                  შენახვა
                </Button>
                <DeleteMovieDialog
                  title={$getEditMovie.data.title}
                  movieId={$getEditMovie.data.id}
                />
              </Stack>
            </Stack>
          </form>
          <Seasons
            seasons={$getEditMovie.data.seasons}
            id={$getEditMovie.data.id}
          />
        </Box>
      )}
    </Box>
  );
};
export default EditMovie;
