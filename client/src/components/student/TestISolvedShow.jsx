import { useEffect, useState } from "react";
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
import SolvedCards from "./item/SolvedCards";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import QuestionCardShow from "./item/QuestionCardShow";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" }
}));

function TestISolvedShow() {
  const { palette } = useTheme();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role != 3) navigate(-1);
    document.title = "Testify - Çözmüş Olduğum Testler";
    getData();
  }, []);

  const getData = async () => {
    await axios.get("look-over/" + id).then((res) => {
      setData(res.data[0]);
    });
  };

  console.log("data", data);

  if (data === null) {
    return <h1>Yükleniyor Lütfen Bekleyiniz</h1>;
  }

  return (
    <ContentBox className="analytics">
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <h1 style={{ color: palette.primary.main }}>Çözmüş Olduğum Testler</h1>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Card>
                <CardContent>
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item lg={1} md={2} sm={2} xs={2}></Grid>
                    <Grid item lg={7} md={7} sm={7} xs={7}>
                      <TextField
                        value={data?.get_test?.testName}
                        fullWidth
                        label="Test Adı"
                        variant="outlined"
                        disabled
                      />
                    </Grid>
                    <Grid item lg={2} md={2} sm={2} xs={2}>
                      <TextField
                        value={data?.total_point}
                        fullWidth
                        variant="outlined"
                        disabled
                        label="Aldığı Puan"
                      />
                    </Grid>
                    <Grid item lg={2} md={2} sm={2} xs={2}></Grid>
                  </Grid>
                  <CardHeader title="Sorular" />
                  {data
                    ? data.get_solved_questions
                      ? data.get_solved_questions.map((element, index) => (
                          // <Card sx={{ mb: 3 }} key={index}>
                          <QuestionCardShow key={index} index={index} element2={element} />
                          // {/* </Card> */}
                        ))
                      : ""
                    : ""}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ContentBox>
  );
}

export default TestISolvedShow;
