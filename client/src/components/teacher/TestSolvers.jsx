import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  useTheme
} from "@mui/material";
import useAuth from "app/hooks/useAuth";
import axios from "axios.js";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import "./item/print_solvers.css";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" }
}));

function TestSolvers() {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const { testid } = useParams();

  useEffect(() => {
    if (user.role != 2) navigate(-1);
    document.title = "Testify - Testi Çözenler";
    getData();
  }, []);

  const getData = async () => {
    await axios.get("test-solvers/" + testid).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };

  const dailer = (created_at) => {
    let date = new Date(created_at);
    let options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("tr-TR", options);
  };

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Testi Çözenler Listesi"
  });

  return (
    <ContentBox className="analytics" ref={contentToPrint}>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <h1 style={{ color: palette.primary.main }}>
                {data?.test?.testName} testini çözenler{" "}
                {
                  <IconButton
                    className="hidden-print"
                    onClick={() => handlePrint(null, () => contentToPrint.current)}
                  >
                    <LocalPrintshopIcon />
                  </IconButton>
                }
              </h1>
            </Grid>
            <Grid container spacing={3} sx={{ padding: "24px" }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Say</TableCell>
                      <TableCell align="center">İsim</TableCell>
                      <TableCell align="center">Soyisim</TableCell>
                      <TableCell align="center">Aldığı Puan</TableCell>
                      <TableCell align="center">Çözüm Tarihi</TableCell>
                      <TableCell align="center" className="hidden-print">
                        Kağıdına Bak
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.data?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell align="center" component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="center">{row.get_user.name}</TableCell>
                        <TableCell align="center">{row.get_user.surname}</TableCell>
                        <TableCell align="center">{row.total_point}</TableCell>
                        <TableCell align="center">{dailer(row.created_at)}</TableCell>
                        <TableCell align="center" className="hidden-print">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/testsolver/looktest/" + row.id)}
                          >
                            Bak
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ContentBox>
  );
}

export default TestSolvers;
