import { React, useState } from "react";
import { Button, Card, CardContent, Checkbox, Divider, FormControlLabel } from "@mui/material";
import { toast } from "react-toastify";
import useAuth from "app/hooks/useAuth";
import axios from "axios.js";

function DeleteAccountContent() {
  const [value, setValue] = useState(false);
  const { user, logout } = useAuth();

  const handleChange = (event) => {
    setValue(!value);
  };

  const onSubmit = () => {
    console.log(user.id);
    axios
      .delete("delete-account/" + user.id)
      .then((res) => {
        toast.success("Hesabınız başarıyla silindi!");
        // window.location.reload();
        logout();
      })
      .catch((err) => {
        toast.error("Bir şeyler yanlış gitti!");
      });
  };

  return (
    <Card>
      <CardContent>
        <h3>Hesabı Sil</h3>
        <p>Hesabınızı silerseniz hesabınıza erişemezsiniz!</p>
        <Divider sx={{ my: 2 }} />
        <FormControlLabel
          control={<Checkbox checked={value} onChange={(_) => handleChange()} />}
          label="Hesabımı sildikten sonra erişemeyeceğimi anlıyorum."
        />
        <br />
        <Button variant="contained" color="error" disabled={!value} onClick={() => onSubmit()}>
          Hesabı sil
        </Button>
      </CardContent>
    </Card>
  );
}

export default DeleteAccountContent;
