import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAuthContext } from "lib/providers/login-provider/context/authContext";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { setRefreshToken } from "lib/providers/login-provider/token";
import { setGlobalAccessToken } from "lib/providers/login-provider/context/accessToken";
import logo from "../../../global/images/firu-logo-lg.png";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { registration } from "modules/login/api/loginFetch";
export type RegistrationFormFields = {
  email: string;
  username: string;
  password: string;
  Rpassword: string;
};
const Registration = () => {
  const schema = yup.object().shape({
    email: yup.string().email("ელ.ფოსტა შეყვანილია არასწორად!").required(),
    username: yup.string().min(4, "შეიყვანეთ მინიმუმ 4 სიმბოლო!").required(),
    password: yup.string().min(8, "შეიყვანეთ მინიმუმ 8 სიმბოლო!").required(),
    Rpassword: yup
      .string()
      .min(8, "შეიყვანეთ მინიმუმ 8 სიმბოლო!")
      .oneOf([yup.ref("password")], "პაროლები ერთმანეთს არ ემთხვევა!")
      .required(),
  });
  const { setCheckAuth, setUserInfo } = useAuthContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const $registration = useMutation(registration);

  const onSubmit = (data: RegistrationFormFields) => {
    $registration.mutate(data, {
      onSuccess: (data) => {
        setRefreshToken(data.tokens.refreshToken);
        setGlobalAccessToken(data.tokens.accessToken);
        setCheckAuth(data.tokens.accessToken);
        setUserInfo(data.user);
        setCheckAuth(data.tokens.refreshToken);
        navigate("/");
      },
    });
  };
  return (
    <Stack alignItems="center" width={1} mt={5}>
      <Stack
        justifyContent="center"
        width={1}
        alignItems="center"
        spacing={2}
        sx={{
          //   background: "white",
          maxWidth: { lg: "400px", xs: "300px" },
          borderRadius: 1,
          p: "20px 20px 50px 20px",
        }}
      >
        <Box component="img" src={logo} width={180} mb={4} />
        <Box>
          <Typography variant="h1">რეგისტრაცია</Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" spacing={2}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => navigate("/")}
                  startIcon={<HomeRoundedIcon />}
                >
                  მთავარ გვერდზე დაბრუნება
                </Button>
              </Stack>
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="ელ.ფოსტა"
                    type="text"
                    required
                    helperText={error?.message}
                    error={!!errors.email}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="username"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="მეტსახელი"
                    type="text"
                    required
                    helperText={error?.message}
                    error={!!errors.username}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="პაროლი"
                    type="password"
                    required
                    helperText={error?.message}
                    error={!!errors.password}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="Rpassword"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="გაიმეორეთ პაროლი"
                    type="password"
                    required
                    helperText={error?.message}
                    error={!!errors.Rpassword}
                    {...field}
                  />
                )}
              />

              <Stack direction="row">
                <Button
                  fullWidth
                  type="submit"
                  //  disabled={$login.isLoading}
                >
                  დასრულება
                </Button>
              </Stack>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography>გაქვთ აქაუნთი?</Typography>
                <Button variant="text" onClick={() => navigate("/login")}>
                  ავტორიზაცია
                </Button>
              </Stack>
            </Stack>
          </form>
          <Box mt={2}>
            <Alert severity="info">
              თქვენ მიერ წარმოდგენილი ინფორმაციიდან სხვა მომხმარებლებისთვის
              ხელმისაწვდომი მხოლოდ „მეტსახელი“ იქნება.
            </Alert>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Registration;
