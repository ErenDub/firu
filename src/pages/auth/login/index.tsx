import { Box, Button, Stack, TextField, Typography } from "@mui/material";
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
import { login } from "modules/login/api/loginFetch";
type LoginFormFields = {
  email: string;
  password: string;
};
const Login = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("ელ.ფოსტა შეყვანილია არასწორად!")
      .required("სავალდებულო ველი!"),
    password: yup.string().min(8, "შეიყვანეთ მინიმუმ 8 სიმბოლო!").required(),
  });
  const { setCheckAuth, setUserInfo } = useAuthContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const $login = useMutation(login);

  const onSubmit = (data: LoginFormFields) => {
    const { email, password } = data;
    console.log(1);
    $login.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          setRefreshToken(data.refreshToken);
          setGlobalAccessToken(data.accessToken);
          setCheckAuth(data.accessToken);

          setUserInfo(data.user);
          setCheckAuth(data.refreshToken);
          const targetUser = sessionStorage.getItem("target");
          targetUser && sessionStorage.removeItem("target");
          navigate("/");
        },
      }
    );
  };
  return (
    <Stack mt={5} alignItems="center" width={1}>
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
          <Typography variant="h1">ავტორიზაცია</Typography>
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

              <Stack direction="row">
                <Button
                  fullWidth
                  type="submit"
                  //  disabled={$login.isLoading}
                >
                  შესვლა
                </Button>
              </Stack>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography>არ გაქვს აქაუნთი?</Typography>
                <Button
                  variant="text"
                  onClick={() => navigate("/registration")}
                >
                  რეგისტრაცია
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Login;
