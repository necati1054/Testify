import React, { useState } from "react";
import { Button, Card, CardContent, Grid, IconButton, TextField } from "@mui/material";
import axios from "axios.js";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "app/hooks/useAuth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const schema = yup.object().shape({
  oldPassword: yup.string().required(),
  newPassword: yup
    .string()
    .min(8, "password min length 8")
    .matches(/[A-Z]/, "password must contain at least one uppercase character")
    .matches(/[a-z]/, "password must contain at least one lowercase character")
    .required(),
  newPasswordConfirm: yup.string().oneOf([yup.ref("newPassword"), null], "Passwords must match")
});

function PasswordContent() {
  const { user } = useAuth();
  const [oldPassword, setOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [newPasswordAgain, setNewPasswordAgain] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    axios
      .post("/user-password-update/" + user.id, data)
      .then((res) => {
        toast.success("Şifre başarıyla güncellendi!");
      })
      .catch((err) => {
        toast.error("Bir şeyler yanlış gitti!");
      });
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <h3>Şifre değiştir</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="oldPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={{ mb: 3 }}
                    fullWidth
                    type={oldPassword ? "text" : "password"}
                    label="Eski Şifre"
                    variant="outlined"
                    {...field}
                    error={Boolean(errors.oldPassword)}
                    helperText={errors.oldPassword ? errors.oldPassword.message : ""}
                    InputProps={{
                      endAdornment: (
                        <IconButton>
                          {oldPassword ? (
                            <VisibilityOffIcon onClick={() => setOldPassword(!oldPassword)} />
                          ) : (
                            <RemoveRedEyeIcon onClick={() => setOldPassword(!oldPassword)} />
                          )}
                        </IconButton>
                      )
                    }}
                  />
                )}
              />
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={{ mb: 3 }}
                    fullWidth
                    type={newPassword ? "text" : "password"}
                    label="Yeni Şifre"
                    variant="outlined"
                    {...field}
                    error={Boolean(errors.newPassword)}
                    helperText={errors.newPassword ? errors.newPassword.message : ""}
                    InputProps={{
                      endAdornment: (
                        <IconButton>
                          {newPassword ? (
                            <VisibilityOffIcon onClick={() => setNewPassword(!newPassword)} />
                          ) : (
                            <RemoveRedEyeIcon onClick={() => setNewPassword(!newPassword)} />
                          )}
                        </IconButton>
                      )
                    }}
                  />
                )}
              />
              <Controller
                name="newPasswordConfirm"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type={newPasswordAgain ? "text" : "password"}
                    label="Yeni Şifre Tekrar"
                    variant="outlined"
                    {...field}
                    error={Boolean(errors.newPasswordConfirm)}
                    helperText={errors.newPasswordConfirm ? errors.newPasswordConfirm.message : ""}
                    InputProps={{
                      endAdornment: (
                        <IconButton>
                          {newPasswordAgain ? (
                            <VisibilityOffIcon
                              onClick={() => setNewPasswordAgain(!newPasswordAgain)}
                            />
                          ) : (
                            <RemoveRedEyeIcon
                              onClick={() => setNewPasswordAgain(!newPasswordAgain)}
                            />
                          )}
                        </IconButton>
                      )
                    }}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "20px" }}
              >
                Güncelle
              </Button>
            </form>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <h3>Parola gereksinimleri</h3>
            <p>Bu gereksinimlerin karşılandığından emin olun:</p>
            <ul>
              <li>Minimum 8 karakter uzunluğunda - ne kadar çok olursa o kadar iyi</li>
              <li>En az bir küçük harf karakteri</li>
              <li>En az bir büyük harf</li>
              <li>En az bir sayı, sembol veya boşluk karakteri</li>
            </ul>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default PasswordContent;
