import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import {
  Button,
  Container,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { styled } from "@mui/material/styles";
import Header from "./item/Header";
import { useNavigate } from "react-router-dom";
import Footer from "./item/Footer";
import axios from "axios.js";

const mainColor = "#d97227";

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: mainColor,
  color: "white",
  border: `2px solid ${theme.palette.augmentColor({ color: { main: mainColor } }).dark}`,
  borderRadius: "10px 0px 10px 0px",
  fontSize: "larger",
  height: "4rem",
  width: "12rem",
  marginBottom: "1em",
  transition: "background-color 0.3s, border-color 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.augmentColor({ color: { main: mainColor } }).dark,
    borderColor: theme.palette.augmentColor({ color: { main: mainColor } }).darker
  }
}));

const CustomContainer = styled(Container)(({ theme }) => ({
  backgroundColor: "transparent",
  color: theme.palette.augmentColor({ color: { main: mainColor } }).dark,
  border: `4px solid ${theme.palette.augmentColor({ color: { main: mainColor } }).dark}`,
  borderRadius: "25px 0px 25px 0px",
  fontSize: "larger",
  transition: "background-color 0.3s, border-color 0.3s"
}));

const CustomAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: "transparent",
  color: theme.palette.augmentColor({ color: { main: mainColor } }).dark,
  border: `4px solid ${theme.palette.augmentColor({ color: { main: mainColor } }).dark}`,
  borderRadius: "25px 0px 25px 0px",
  fontSize: "larger",
  transition: "background-color 0.3s, border-color 0.3s"
}));

const FirstUpperCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

function HomePage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const gotoLogin = () => {
    navigate("/login");
  };

  const gotoRegister = () => {
    navigate("/register");
  };

  const getData = async () => {
    axios
      .get("/home-page")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dateFormater = (date) => {
    const d = new Date(date);
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Header />
      <Container
        fixed
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex"
        }}
        id="home"
      >
        <Grid container spacing={2} sx={{ marginTop: "2em", marginBottom: "2em" }}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ position: "relative", margin: "auto" }}>
            <h1 style={{ fontSize: "3.8em" }}>Testify</h1>
            <h3 style={{ fontWeight: "300", fontSize: "1.5em" }}>
              Öğretmenler İçin Kolay, Öğrenciler İçin Eğlenceli Testler! <br /> TESTİFY ile Bilgini
              Test Et, Başarını Artır!
            </h3>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomButton
                  variant="outlined"
                  color="primary"
                  sx={{ width: "100%" }}
                  onClick={() => gotoRegister()}
                >
                  Kayıt Ol
                </CustomButton>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomButton variant="outlined" color="secondary" sx={{ width: "100%" }}>
                  Sıkça Sorulan Sorular
                </CustomButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
            width="100%"
            sx={{ textAlign: "center", display: "flex" }}
          >
            <img
              src="/assets/images/hero-1.jpg"
              alt="Home Page Image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px"
              }}
            />
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Grid container spacing={2} style={{ marginTop: "2em" }}>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <CustomContainer
              style={{
                width: "100%",
                padding: "10px",
                textAlign: "center"
              }}
              className={styles.borderGradient}
            >
              <h3>+50 Fazla Test</h3>
            </CustomContainer>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <CustomContainer
              style={{
                width: "100%",
                padding: "10px",
                textAlign: "center"
              }}
              className={styles.borderGradient}
            >
              <h3>+20 Öğretmen</h3>
            </CustomContainer>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <CustomContainer
              style={{
                width: "100%",
                padding: "10px",
                textAlign: "center"
              }}
              className={styles.borderGradient}
            >
              <h3>+500 Öğrenci</h3>
            </CustomContainer>
          </Grid>
        </Grid>
      </Container>

      <Container>
        <h1 style={{ fontSize: "3.8em", marginBottom: "1em", marginTop: "1.5em" }}>
          Son Eklenen 3 Test
        </h1>
        <Grid container spacing={2}>
          {data?.testLatest?.map((test) => (
            <Grid item lg={4} md={4} sm={12} xs={12} key={test.id}>
              <CustomContainer
                style={{
                  padding: "10px",
                  textAlign: "center"
                }}
                className={styles.borderGradient}
              >
                <h3>{FirstUpperCase(test.testName)}</h3>
                <p style={{ padding: "0 10px 0 10px" }}>Tarih: {dateFormater(test.created_at)}</p>
                <p style={{ padding: "0 10px 0 10px" }}>
                  Oluşturan Kişi: {test.get_creater.name} {test.get_creater.surname}
                </p>
                <CustomButton onClick={() => gotoLogin()}>Testi Çöz</CustomButton>
              </CustomContainer>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container>
        <h1 style={{ fontSize: "3.8em", marginBottom: "1em" }}>Karışık 3 Test</h1>
        <Grid container spacing={2}>
          {data?.randomTests?.map((test) => (
            <Grid item lg={4} md={4} sm={12} xs={12} key={test.id}>
              <CustomContainer
                style={{
                  padding: "10px",
                  textAlign: "center"
                }}
                className={styles.borderGradient}
              >
                <h3>{FirstUpperCase(test.testName)}</h3>
                <p style={{ padding: "0 10px 0 10px" }}>Tarih: {dateFormater(test.created_at)}</p>
                <p style={{ padding: "0 10px 0 10px" }}>
                  Oluşturan Kişi: {test.get_creater.name} {test.get_creater.surname}
                </p>
                <CustomButton onClick={() => gotoLogin()}>Testi Çöz</CustomButton>
              </CustomContainer>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container
        sx={{
          fontFamily: "Roboto",
          backgroundColor: "transparent",
          paddingBottom: "2em"
        }}
        id="faq"
      >
        <h1 style={{ fontSize: "3.8em", marginBottom: "1em" }}>Sıkça Sorulan Sorular</h1>
        <CustomAccordion
          style={{
            marginBottom: "1em",
            borderRadius: "25px 0 25px 0",
            backgroundColor: "#d97227",
            color: "#E0E0E0"
          }}
        >
          <AccordionSummary
            sx={{ borderRadius: "25px 0 25px 0" }}
            expandIcon={<ArrowDownwardIcon htmlColor="#974f1b" />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <h3 style={{ margin: "0px" }}>TESTİFY nedir ve nasıl çalışır?</h3>
          </AccordionSummary>
          <AccordionDetails sx={{ borderRadius: "25px 0 25px 0" }}>
            TESTİFY, öğretmenlerin sınav soruları ekleyebildiği ve öğrencilerin bu soruları çözerek
            kendilerini test edebildiği bir online eğitim platformudur. Öğretmenler, konulara göre
            testler oluşturabilir. Öğrenciler ise bu testleri çözerek bilgilerini pekiştirir.
          </AccordionDetails>
        </CustomAccordion>
        <CustomAccordion
          style={{
            marginBottom: "1em",
            borderRadius: "25px 0 25px 0",
            backgroundColor: "#d97227",
            color: "#E0E0E0"
          }}
        >
          <AccordionSummary
            sx={{ borderRadius: "25px 0 25px 0" }}
            expandIcon={<ArrowDownwardIcon htmlColor="#974f1b" />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <h3 style={{ margin: "0px" }}>Öğretmen olarak nasıl test oluşturabilirim?</h3>
          </AccordionSummary>
          <AccordionDetails sx={{ borderRadius: "25px 0 25px 0" }}>
            TESTİFY platformuna öğretmen olarak giriş yaptıktan sonra, "Oluşturduğum Testler"
            bölümüne giderek ekranın sağ alt tarafında bulunan artı "+" butonuna tıklayarak test
            oluşturabilirsiniz.
          </AccordionDetails>
        </CustomAccordion>
        <CustomAccordion
          style={{
            marginBottom: "1em",
            borderRadius: "25px 0 25px 0",
            backgroundColor: "#d97227",
            color: "#E0E0E0"
          }}
        >
          <AccordionSummary
            sx={{ borderRadius: "25px 0 25px 0" }}
            expandIcon={<ArrowDownwardIcon htmlColor="#974f1b" />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <h3 style={{ margin: "0px" }}>Öğrenci olarak testleri nasıl çözebilirim?</h3>
          </AccordionSummary>
          <AccordionDetails sx={{ borderRadius: "25px 0 25px 0" }}>
            TESTİFY platformuna öğrenci olarak giriş yaptığınızda, "Bütün Testler" bölümünden çözmek
            istediğiniz testi seçerek testi çözebilirsiniz. Testi çözdükten sonra, testin sonunda
            aldığınız puanı ve doğru-yanlış cevaplarınızı görebilirsiniz.
          </AccordionDetails>
        </CustomAccordion>
        <CustomAccordion
          style={{
            marginBottom: "1em",
            borderRadius: "25px 0 25px 0",
            backgroundColor: "#d97227",
            color: "#E0E0E0"
          }}
        >
          <AccordionSummary
            sx={{ borderRadius: "25px 0 25px 0" }}
            expandIcon={<ArrowDownwardIcon htmlColor="#974f1b" />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <h3 style={{ margin: "0px" }}>TESTİFY’de nasıl hesap oluşturabilirim?</h3>
          </AccordionSummary>
          <AccordionDetails sx={{ borderRadius: "25px 0 25px 0" }}>
            TESTİFY platformunda hesap oluşturmak için, "Kayıt Ol" butonuna tıklayarak gerekli
            bilgileri doldurmanız yeterlidir.
          </AccordionDetails>
        </CustomAccordion>
        <CustomAccordion
          style={{
            marginBottom: "1em",
            borderRadius: "25px 0 25px 0",
            backgroundColor: "#d97227",
            color: "#E0E0E0"
          }}
        >
          <AccordionSummary
            sx={{ borderRadius: "25px 0 25px 0" }}
            expandIcon={<ArrowDownwardIcon htmlColor="#974f1b" />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <h3 style={{ margin: "0px" }}>Bütün test sonuçlarımı nasıl görebilirim?</h3>
          </AccordionSummary>
          <AccordionDetails sx={{ borderRadius: "25px 0 25px 0" }}>
            TESTİFY platformuna öğrenci olarak giriş yaptığınızda, "Çözmüş Olduğum Testler"
            bölümünden istediğiniz testin sonuçların "Gözden Geçir" Butonuna tıklayarak
            görebilirsiniz.
          </AccordionDetails>
        </CustomAccordion>
      </Container>
      <Footer data={data?.settings} />
    </div>
  );
}

export default HomePage;
