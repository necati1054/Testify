import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, CardMedia, Grid, TextField, Button } from "@mui/material";
import axios from "axios.js";
import { useEffect } from "react";
import { toast } from "react-toastify";

const initialValues = {
  name: "",
  surname: "",
  email: ""
};

function BasicİnformationContent({ user, logout }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: initialValues
  });

  const onSubmit = async (data) => {
    axios
      .post("/user-update/" + user.id, data)
      .then((res) => {
        toast.success("Kullanıcı Ayarları Başarıyla Kaydedildi.");
        logout();
      })
      .catch((err) => {
        toast.error("Bir şeyler yanlış gitti!");
      });
  };

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        surname: user.surname,
        email: user.email
      });
    }
  }, [user]);

  return (
    <>
      <Card>
        <CardMedia image="/assets/images/g-1.jpg" sx={{ height: 140 }} />
        <img
          src="/assets/images/avatars/001-man.svg"
          alt="user"
          style={{
            height: "100px",
            width: "100px",
            borderRadius: "50%",
            position: "absolute",
            left: "62%",
            transform: "translate(-50%, -50%)"
          }}
        />
        <CardContent sx={{ marginTop: "20px" }}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ textAlign: "center" }}>
              <h4 style={{ marginBottom: "0px" }}>
                {user.name} - {user.surname}
              </h4>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ textAlign: "center", padding: "0px" }}>
              <h4 style={{ marginTop: "0px" }}>{user.email}</h4>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: "10px" }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
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
                      helperText={errors.name ? errors.name.message : ""}
                    />
                  )}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
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
                      helperText={errors.surname ? errors.surname.message : ""}
                    />
                  )}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Controller
                  name="email"
                  control={control}
                  disabled
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      {...field}
                      error={Boolean(errors.email)}
                      helperText={errors.email ? errors.email.message : ""}
                    />
                  )}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Güncelle
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default BasicİnformationContent;
