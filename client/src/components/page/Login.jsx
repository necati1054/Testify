import React, { useEffect, useState } from "react";
import { Button, Card, CircularProgress, Grid, TextField } from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import { Paragraph } from "app/components/Typography";
import useAuth from "app/hooks/useAuth";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)"
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: "#1A2038",
  minHeight: "100% !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center"
  }
}));

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string().required("Şifre Zorunlu!"),
  email: Yup.string().email("Invalid Email address").required("Email Adresi Zorunlu!")
});

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login, checkAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const isValidToken = async (accessToken) => {
    if (!accessToken) {
      return false;
    }

    const decodedToken = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp > currentTime) {
      try {
        await checkAuth();
        navigate("/dashboard");
      } catch (e) {
        localStorage.removeItem("accessToken");
      }
    } else {
      localStorage.removeItem("accessToken");
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    isValidToken(accessToken);
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
      setLoading(false);
    } catch (e) {
      if (e.status === 401) toast.error("Yanlış email veya şifre! Lütfen tekrar deneyin.");
      else toast.error("Sunucu Hatası");
      setLoading(false);
    }
  };

  function GradientCircularProgress() {
    return (
      <React.Fragment>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress sx={{ "svg circle": { stroke: "url(#my_gradient)" } }} />
      </React.Fragment>
    );
  }

  return (
    <JWTRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <img src="/assets/images/illustrations/dreamer.svg" width="100%" alt="" />
            </JustifyBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  errors={errors}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      error={errors.email}
                      variant="outlined"
                      onChange={onChange}
                      value={value}
                      helperText={errors.email?.message}
                      label={"Email"}
                      sx={{ mb: 2 }}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  errors={errors}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      type="password"
                      error={errors.password}
                      variant="outlined"
                      onChange={onChange}
                      value={value}
                      helperText={errors.password?.message}
                      label={"Şifre"}
                      sx={{ mb: 2 }}
                    />
                  )}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ my: 2 }}
                  style={{ padding: "6px,16px", width: "35%", height: "40px" }}
                  color="primary"
                  disabled={loading}
                >
                  {loading ? <GradientCircularProgress /> : "Giriş Yap"}
                </Button>
                <Paragraph>
                  Hesabın yok mu?{" "}
                  <NavLink
                    to="/register"
                    style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                  >
                    Kayıt Ol
                  </NavLink>
                </Paragraph>
                <br />
                <Paragraph>
                  Şifremi Unuttum?{" "}
                  <NavLink
                    to="/resetpassword"
                    style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                  >
                    Şifremi Sıfırla
                  </NavLink>
                </Paragraph>
              </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
      <ToastContainer />
    </JWTRoot>
  );
};

export default Login;
