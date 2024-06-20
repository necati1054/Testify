import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Card,
  Grid,
  TextField,
  Box,
  styled,
  Button,
  Radio,
  RadioGroup,
  IconButton
} from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import useAuth from "app/hooks/useAuth";
import { toast } from "react-toastify";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// STYLED COMPONENTS
const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center"
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: "center"
}));

const ContentBox = styled(JustifyBox)(() => ({
  height: "100%",
  padding: "32px",
  background: "rgba(0, 0, 0, 0.01)"
}));

const ContentBox2 = styled(Box)(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)"
}));

const JWTRegister = styled(JustifyBox)(() => ({
  background: "#1A2038",
  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center"
  }
}));

// initial login credentials
const initialValues = {
  name: "",
  surname: "",
  email: "",
  role: "",
  password: ""
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Şifre Minimum Uzunluğu 8 Karakter Olmalıdır")
    .matches(/[A-Z]/, "Şifre En Az Bir Büyük Harf İçermelidir")
    .matches(/[a-z]/, "Şifre En Az Bir Küçük Harf İçermelidir")
    .required(),
  email: Yup.string().email("Invalid Email address").required("Email Gereklidir!"),
  name: Yup.string().required("İsim Gereklidir!"),
  surname: Yup.string().required("Soyisim Gereklidir!"),
  role: Yup.string().required("Ünvan Gereklidir!")
});

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await register(data.name, data.surname, data.email, data.role, data.password);
      navigate("/");
      setLoading(false);
    } catch (e) {
      console.log(e);
      toast.error("Bir şeyler yanlış gitti!");
      setLoading(false);
    }
  };

  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <img
                width="100%"
                alt="Register"
                src="/assets/images/illustrations/posting_photo.svg"
              />
            </ContentBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox2>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="İsim"
                      variant="outlined"
                      {...field}
                      error={Boolean(errors.name)}
                      sx={{ mb: 3 }}
                      helperText={errors.name ? errors.name.message : ""}
                    />
                  )}
                />
                <Controller
                  name="surname"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Soyisim"
                      variant="outlined"
                      {...field}
                      error={Boolean(errors.surname)}
                      sx={{ mb: 3 }}
                      helperText={errors.surname ? errors.surname.message : ""}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      {...field}
                      error={Boolean(errors.email)}
                      sx={{ mb: 3 }}
                      helperText={errors.email ? errors.email.message : ""}
                    />
                  )}
                />
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup row aria-label="role" name="role" {...field} sx={{ mb: 2 }}>
                      <FlexBox>
                        <Radio value="2" />
                        <label>Öğretmen</label>
                      </FlexBox>
                      <FlexBox>
                        <Radio value="3" />
                        <label>Öğrenci</label>
                      </FlexBox>
                    </RadioGroup>
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      label="Şifre"
                      variant="outlined"
                      autocomplate="new-password"
                      {...field}
                      error={Boolean(errors.password)}
                      sx={{ mb: 3 }}
                      helperText={errors.password ? errors.password.message : ""}
                      InputProps={{
                        endAdornment: (
                          <IconButton>
                            {showPassword ? (
                              <VisibilityOffIcon onClick={() => setShowPassword(!showPassword)} />
                            ) : (
                              <RemoveRedEyeIcon onClick={() => setShowPassword(!showPassword)} />
                            )}
                          </IconButton>
                        )
                      }}
                    />
                  )}
                />
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                  Kayıt Ol
                </Button>
              </form>
            </ContentBox2>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
}

export default Register;
