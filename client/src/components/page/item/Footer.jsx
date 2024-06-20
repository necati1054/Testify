import React from "react";
import { Container, Grid, Typography, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

const mainColor = "#d8b69e";

const FooterContainer = styled(Container)(({ theme }) => ({
  backgroundColor: mainColor,
  color: "white",
  padding: "2rem 0",
  marginTop: "2rem",
  textAlign: "center"
}));

const Footer = ({ data }) => {
  return (
    <FooterContainer id="iletisim">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">İletişim</Typography>
          <Typography>
            Telefon: {data?.filter((deger) => deger.key == "phone")[0]?.value}
          </Typography>
          <Typography>Email: {data?.filter((deger) => deger.key == "email")[0]?.value}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Sosyal Medya</Typography>
          <Link
            href={
              "https://www.instagram.com/" +
              data?.filter((deger) => deger.key == "instagram")[0]?.value
            }
            color="inherit"
            target="_blank"
            sx={{
              display: "block",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: "bold",
              textAlign: "center",
              padding: "0.5rem"
            }}
          >
            İnstagram: {data?.filter((deger) => deger.key == "instagram")[0]?.value}
          </Link>
          <Link
            href={
              "https://www.facebook.com/" +
              data?.filter((deger) => deger.key == "facebook")[0]?.value
            }
            color="inherit"
            target="_blank"
            sx={{
              display: "block",
              marginBottom: "0.5rem",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: "bold",
              textAlign: "center",
              padding: "0.5rem"
            }}
          >
            Facebook: {data?.filter((deger) => deger.key == "facebook")[0]?.value}
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Konum</Typography>
          <Typography>{data?.filter((deger) => deger.key == "address")[0]?.value}</Typography>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6352252.32432791!2d29.845249160321572!3d38.97684404417161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b0155c964f2671%3A0x40d9dbd42a625f2a!2zVMO8cmtpeWU!5e0!3m2!1str!2str!4v1716474190881!5m2!1str!2str"
            width="300"
            height="150"
            style={{ border: 0, marginTop: "1rem" }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </Grid>
      </Grid>
      <Typography variant="body2" sx={{ marginTop: "1rem" }}>
        © 2024 TESTİFY. Tüm Hakları Saklıdır.
      </Typography>
    </FooterContainer>
  );
};

export default Footer;
