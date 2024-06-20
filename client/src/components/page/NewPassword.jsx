import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Grid, styled, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

// STYLED COMPONENTS
const StyledRoot = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#1A2038",
  minHeight: "100vh !important",

  "& .card": {
    maxWidth: 800,
    margin: "1rem",
    borderRadius: 12
  },

  ".img-wrapper": {
    display: "flex",
    padding: "2rem",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const ContentBox = styled("div")(({ theme }) => ({
  padding: 32,
  background: theme.palette.background.default
}));

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "password min length 8")
    .matches(/[A-Z]/, "password must contain at least one uppercase character")
    .matches(/[a-z]/, "password must contain at least one lowercase character")
    .required(),
  newPasswordConfirm: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match")
});

function NewPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { code } = useParams();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    axios
      .post("/new-password/" + code, data)
      .then((_) => {
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        if (error.status === 402) {
          toast.error("Şifre sıfırlama bağlantısının süresi doldu! Bağlantı tekrar gönderildi.");
          setLoading(false);
        }
        if (error.status === 403) {
          console.log(error);
          toast.error("Geçersiz şifre sıfırlama bağlantısı!");
          setLoading(false);
        }
      });
  };

  return (
    <StyledRoot>
      <Card className="card">
        <Grid container>
          <Grid item xs={12}>
            <div className="img-wrapper">
              <img width="300" src="/assets/images/illustrations/dreamer.svg" alt="" />
            </div>

            <ContentBox>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="password"
                      fullWidth
                      variant="outlined"
                      type="password"
                      error={errors.password ? true : false}
                      helperText={errors.password ? errors.password.message : ""}
                      sx={{ mb: 2 }}
                    />
                  )}
                />
                <Controller
                  name="newPasswordConfirm"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Password Confirm"
                      fullWidth
                      variant="outlined"
                      type="password"
                      error={errors.newPasswordConfirm ? true : false}
                      helperText={
                        errors.newPasswordConfirm ? errors.newPasswordConfirm.message : ""
                      }
                      sx={{ mb: 2 }}
                    />
                  )}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  Reset Password
                </Button>
              </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
      <ToastContainer />
    </StyledRoot>
  );
}

export default NewPassword;
