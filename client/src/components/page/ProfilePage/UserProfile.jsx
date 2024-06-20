import { React, useState } from "react";
import { useEffect } from "react";
import {
  Grid,
  ListItem,
  ListItemIcon,
  styled,
  useTheme,
  ListItemButton,
  List,
  Card
} from "@mui/material";
import useAuth from "app/hooks/useAuth";
import Person2Icon from "@mui/icons-material/Person2";
import ListItemText from "@mui/material/ListItemText";
import KeyIcon from "@mui/icons-material/Key";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm } from "react-hook-form";
import Basicİnformation from "./BasicİnformationContent";
import PasswordContent from "./PasswordContent";
import DeleteAccountContent from "./DeleteAccountContent";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" }
}));

function UserProfile() {
  const { palette } = useTheme();
  const { logout, user } = useAuth();

  const [value, setValue] = useState(0);

  const { reset } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        surname: user.surname,
        email: user.email
      });
    }
  }, [user]);

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <ContentBox className="analytics">
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <h1 style={{ color: palette.primary.main }}>Profil</h1>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item lg={3} md={3} sm={3} xs={12}>
              <Card>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleChangeIndex(0)}>
                      <ListItemIcon>
                        <Person2Icon />
                      </ListItemIcon>
                      <ListItemText primary="Bilgilerim" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleChangeIndex(1)}>
                      <ListItemIcon>
                        <KeyIcon />
                      </ListItemIcon>
                      <ListItemText primary="Şİfre Değiştir" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleChangeIndex(2)}>
                      <ListItemIcon>
                        <DeleteIcon />
                      </ListItemIcon>
                      <ListItemText primary="Hesabı Sil" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Card>
            </Grid>
            <Grid item lg={9} md={9} sm={9} xs={12}>
              {value === 0 && <Basicİnformation user={user} logout={logout} />}
              {value === 1 && <PasswordContent />}
              {value === 2 && <DeleteAccountContent />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ContentBox>
  );
}

export default UserProfile;
