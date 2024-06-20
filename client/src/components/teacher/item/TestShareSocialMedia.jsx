import { Grid } from "@mui/material";
import React from "react";
import {
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function TestShareSocialMedia({ id, testName }) {
  const navigateToTest = (testName, id) => {
    let slug = slugify(testName);
    if (window.location.hostname == "localhost") return `http://localhost:3000/test/${slug}/${id}`;
    return `https://testify.necatiarman.dev/test/${slug}/${id}`;
  };

  const changeData = (data) => {
    window.document.ogtitle = data;
  };

  return (
    <Grid container spacing={2}>
      <Grid item lg={3} md={3} sm={12} xs={12}>
        <LinkedinShareButton url={navigateToTest(testName, id)}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </Grid>
      <Grid item lg={3} md={3} sm={12} xs={12}>
        <TwitterShareButton url={navigateToTest(testName, id)}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </Grid>
      <Grid item lg={3} md={3} sm={12} xs={12}>
        <EmailShareButton url={navigateToTest(testName, id)}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </Grid>
      <Grid item lg={3} md={3} sm={12} xs={12}>
        <WhatsappShareButton
          url={navigateToTest(testName, id)}
          windowHeight="1000px"
          windowWidth="1000px"
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </Grid>
    </Grid>
  );
}

export default TestShareSocialMedia;
