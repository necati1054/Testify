import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  styled,
  useTheme
} from "@mui/material";
import axios from "axios.js";
import useAuth from "app/hooks/useAuth";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useEffect } from "react";

const validationSchema = Yup.object().shape({
  testName: Yup.string().required("Test Name is required!"),
  totalPoint: Yup.number().min(0).required("Total Point is required!")
});

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" }
}));

function CreateTest() {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    if (user.role != 2) navigate(-1);
    document.title = "Testify - Test Oluştur";
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data) => {
    data.user_id = user.id;
    try {
      axios
        .post("/create-test", data)
        .then((response) => {
          toast.success("Test Başarıyla Oluşturuldu!");
          navigate("/testıcreated");
        })
        .catch((error) => {
          toast.error("Test Oluşturulamadı!");
          console.log(error);
        });
    } catch (error) {
      toast.error("Test Oluşturulamadı!");
      console.log(error);
    }
  };

  return (
    <ContentBox className="analytics">
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <h1 style={{ color: palette.primary.main }}>Test Oluştur</h1>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Card>
                <CardHeader title="Test Bilgileri" />
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                      <Grid item lg={3}>
                        <Controller
                          name="testName"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              onChange={onChange}
                              label="Test İsmi"
                              variant="outlined"
                              fullWidth
                              defaultValue=""
                              error={errors.testName ? true : false}
                              helperText={errors.testName ? errors.testName.message : ""}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item lg={3}>
                        <Controller
                          name="totalPoint"
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              onChange={onChange}
                              label="Toplam Puan"
                              defaultValue="0"
                              variant="outlined"
                              fullWidth
                              type="number"
                              error={errors.totalPoint ? true : false}
                              helperText={errors.totalPoint ? errors.totalPoint.message : ""}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item lg={3} style={{ alignItems: "center", display: "flex" }}>
                        <Button type="submit" variant="contained">
                          Test Oluştur
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ContentBox>
  );
}

export default CreateTest;
