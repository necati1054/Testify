import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
  styled,
  useTheme
} from "@mui/material";
import useAuth from "app/hooks/useAuth";
import axios from "axios.js";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import SolverQuestionCardShow from "./item/SolverQuestionCardShow";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import "./item/print_solver.css";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" }
}));

function TestSolver() {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (user.role != 2) navigate(-1);
    document.title = "Testify - Cevağ Kağıdı";
    getData();
  }, []);

  const getData = async () => {
    await axios.get("test-solver/" + id).then((res) => {
      console.log(res.data);
      setData(res.data[0]);
    });
  };

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Öğrencinin Cevap Kağıdı"
  });

  return (
    <ContentBox className="analytics" ref={contentToPrint}>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <h1 style={{ color: palette.primary.main }}>
                {data?.get_user?.name}-{data?.get_user?.surname} {data?.get_test?.testName} testi
                cevapları
                {
                  <IconButton
                    onClick={() => handlePrint(null, () => contentToPrint.current)}
                    className="hidden-print"
                  >
                    <LocalPrintshopIcon />
                  </IconButton>
                }
              </h1>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Card>
                <CardContent>
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item lg={1} md={2} sm={2} xs={2}></Grid>
                    <Grid item lg={7} md={7} sm={7} xs={7}>
                      <TextField
                        value={data?.get_test ? data?.get_test?.testName : ""}
                        fullWidth
                        label="Test Adı"
                        variant="outlined"
                        disabled
                      />
                    </Grid>
                    <Grid item lg={2} md={2} sm={2} xs={2}>
                      <TextField
                        value={
                          data?.total_point ? data?.total_point : data?.total_point == 0 ? 0 : ""
                        }
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
                          <Card sx={{ mb: 3 }} key={index}>
                            <SolverQuestionCardShow key={index} element2={element} />
                          </Card>
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

export default TestSolver;
