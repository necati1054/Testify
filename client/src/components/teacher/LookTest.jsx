import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
  styled,
  useTheme
} from "@mui/material";
import axios from "axios.js";
import useAuth from "app/hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";

import { Controller, useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";

import QuestionCards from "./item/QuestionCards";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import AddIcon from "@mui/icons-material/Add";

const validationSchema = Yup.object().shape({
  testName: Yup.string().required("Test Name is required!"),
  totalPoint: Yup.number().min(0).required("Total Point is required!")
});

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" }
}));

const initialState = {
  testName: "",
  totalPoint: 0
};

const initialState2 = {
  question: []
};

const BottomRight = styled("div")(({ theme }) => ({
  position: "fixed",
  left: "100%",
  top: "90%",
  marginLeft: "-50px"
}));

function LookTest() {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const { id } = useParams();

  const [TestHandle, setTestHandle] = useState(true);

  useEffect(() => {
    if (user.role != 2) navigate(-1);
    getData();
  }, []);

  const getData = async () => {
    await axios.get("bring-the-test/" + id).then((res) => {
      console.log(res.data[0]);
      setData(res.data[0]);
      reset(res.data[0]);
      console.log(res.data[0]);
      document.title = "Testify - " + res.data[0].testName;
      res.data[0].get_questions.forEach((question) => {
        append(question); // Örneğin, question adında bir alan varsa
      });
    });
  };

  const questionSchema = Yup.object().shape({
    question: Yup.array()
      .of(
        Yup.object().shape({
          answers: Yup.array().of(
            Yup.object().shape({
              text: Yup.string().required("Cevap metni zorunludur.")
            })
          ),
          image_path: Yup.string().nullable(),
          point: Yup.string().required("Puan zorunludur."),
          text: Yup.string().required("Soru metni zorunludur."),
          type: Yup.number().oneOf([1, 2, 3]).required("Soru tipi zorunludur.")
        })
      )
      .test(
        "totalPoints",
        "Toplam puan 100 olmalıdır.",
        (value) => value.reduce((acc, curr) => acc + parseInt(curr.point), 0) === data.totalPoint
      )
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialState
  });

  const {
    control: control2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    getValues: getValues2,
    setValue: setValue2,
    formState: { errors: erros2 }
  } = useForm({
    resolver: yupResolver(questionSchema),
    defaultValues: initialState2
  });

  const { fields, append, remove } = useFieldArray({
    control: control2,
    name: "question"
  });

  const onSubmit = async (data) => {
    data.id = id;
    console.log(data);
    await axios
      .post("update-test", data)
      .then((res) => {
        console.log(res.data);
        toast.success("Test Güncellemesi Başarılı");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Test Güncellemesi Başarısız!");
      });
    setTestHandle(true);
  };

  const onSubmit2 = async (data) => {
    console.log(data);
    data.question.forEach((question) => {
      question.test_id = id;
    });

    axios
      .post("create-question", data)
      .then((res) => {
        console.log(res.data);
        toast.success("Sorular Başarılı Bir Şekilde Kaydedildi!");
        reset2(initialState2);
        getData();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Sorular Kaydedilirken Bir Hata Oluştu!");
      });
  };

  const handleTestChange = () => {
    setTestHandle(false);
  };

  const Type1Append = () => {
    append({
      text: "",
      point: "",
      type: 1,
      image_path: "",
      answers: []
    });
  };

  const Type2Append = () => {
    append({
      text: "",
      point: "",
      type: 2,
      image_path: "",
      answers: []
    });
  };

  const Type3Append = () => {
    append({
      text: "",
      point: "",
      type: 3,
      image_path: "",
      answers: []
    });
  };

  const actions = [
    { icon: <AddIcon />, name: "Boşluk Doldurma", click: Type1Append }, //çoktan seçmeli (radio)
    { icon: <AddIcon />, name: "Birden Fazla Cevap", click: Type3Append }, //çoktan seçmeli (checkbox)
    { icon: <AddIcon />, name: "Açık Uçlu Soru", click: Type2Append }, //açık uçlu
    { icon: <AddIcon />, name: "Çoktan Seçmeli", click: Type1Append } //çoktan seçmeli (radio)
  ];

  const questionDelete = async (index) => {
    let id = getValues2(`question.[${index}].id`);
    console.log("delete question id", id);
    if (id === undefined) {
      remove(index);
      return;
    }
    await axios
      .delete("delete-question/" + id)
      .then((res) => {
        console.log(res.data);
        toast.success("Soru Başarılı Şekilde Silindi!");
        remove(index);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Soruyu Silerken Bir Hata Oluştu!");
      });
  };

  const testDelete = async () => {
    await axios
      .delete("delete-test/" + id)
      .then((res) => {
        console.log(res.data);
        toast.success("Test Başarılı Bir Şekilde Silindi!");
        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Test Silinirken Bir Hata Oluştu!");
      });
  };

  if (data.length === 0) {
    return <h1>Yükleniyor Lütfen Bekleyiniz</h1>;
  }

  return (
    <ContentBox className="analytics">
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <h1 style={{ color: palette.primary.main }}>Test Bilgileri</h1>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Card>
                <CardHeader title="Test" />
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                      <Grid item lg={4}>
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
                              disabled={TestHandle ? true : false}
                              error={errors.testName ? true : false}
                              helperText={errors.testName ? errors.testName.message : ""}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item lg={4}>
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
                              disabled={TestHandle ? true : false}
                              error={errors.totalPoint ? true : false}
                              helperText={errors.totalPoint ? errors.totalPoint.message : ""}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item lg={4} style={{ alignItems: "center", display: "flex" }}>
                        <Button
                          variant="contained"
                          type="button"
                          onClick={() => handleTestChange()}
                          sx={TestHandle ? { display: "block" } : { display: "none" }}
                        >
                          Test Güncelle
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          color="success"
                          sx={TestHandle ? { display: "none" } : { display: "block" }}
                        >
                          Kaydet
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          onClick={() => testDelete()}
                          color="error"
                          sx={{
                            marginLeft: 1
                          }}
                        >
                          Testi Sil
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
              <Card sx={{ marginTop: 5 }}>
                <CardHeader title="Sorular" />
                <form onSubmit={handleSubmit2(onSubmit2)}>
                  <CardContent>
                    {fields.map((item, index) => (
                      <Card key={item.id} sx={{ mb: 2 }}>
                        <QuestionCards
                          key={index}
                          index2={index}
                          control2={control2}
                          erros={erros2}
                          type={item.type}
                          questionDelete={questionDelete}
                          getValues2={getValues2}
                          setValue2={setValue2}
                        />
                      </Card>
                    ))}
                  </CardContent>
                  <CardActions sx={{ alignItems: "center", float: "right" }}>
                    {erros2.question && erros2.question.root ? erros2.question.root.message : ""}
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      disabled={fields.length <= 0}
                    >
                      Gönder
                    </Button>
                  </CardActions>
                </form>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <BottomRight>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16
          }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              sx={{
                "& .MuiSpeedDialAction-staticTooltipLabel": {
                  width: "150px"
                }
              }}
              key={action.name}
              icon={action.icon}
              tooltipOpen
              tooltipTitle={action.name}
              onClick={action.click}
            />
          ))}
        </SpeedDial>
      </BottomRight>
    </ContentBox>
  );
}

export default LookTest;
