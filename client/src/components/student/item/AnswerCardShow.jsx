import React, { useRef } from "react";

import {
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  Checkbox,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Card,
  CardMedia,
  CardActions
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import ImageIcon from "@mui/icons-material/Image";

function AnswerCardShow({ element, given_answer_id, type }) {
  // console.log("element", element);

  const imageUrl = (url) => {
    if (window.location.hostname == "localhost") return `http://localhost:8000/Image/` + url;
    return `https://testifybackend.necatiarman.dev/Image/` + url;
  };

  console.log("element", element, "given_answer_id", given_answer_id);
  return (
    // <Grid container spacing={3} sx={element.deleted_at == null ? { mt: 2 } : { display: "none" }}>
    <>
      {type == 1 && (
        <Grid
          item
          lg={3}
          md={12}
          sm={12}
          xs={12}
          sx={element.deleted_at == null ? { mt: 2 } : { display: "none" }}
        >
          <Card sx={{ background: "#666666" }}>
            {element.image_path && (
              <CardMedia
                sx={{
                  height: 140,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center"
                }}
                image={imageUrl(element.image_path)}
                title="green iguana"
                for={element.id}
              />
            )}
            <CardActions>
              <Radio
                disabled
                checked={
                  element.id == given_answer_id ? true : element.correctAnswer == 1 ? true : false
                }
                sx={{
                  "&.MuiButtonBase-root": {
                    color:
                      element.correctAnswer == 1 && element.id == given_answer_id
                        ? "#90CF8E" //doğru işaretedi ise yeşii
                        : element.correctAnswer == 1 && element.id != given_answer_id
                        ? "#90CF8E" //yanlış işaretedi ama doğru cevap ise yeşil
                        : element.correctAnswer != 1 && element.id == given_answer_id
                        ? "#ee6b6e" //yanlış işaretedi ve yanlış cevap ise kırmızı
                        : ""
                  }
                }}
              />
              <h3 style={{ color: "white", fontWeight: "bold" }}>{element.text}</h3>
            </CardActions>
          </Card>
        </Grid>
      )}
      {type == 3 && (
        <Grid
          item
          lg={3}
          md={12}
          sm={12}
          xs={12}
          sx={element.deleted_at == null ? { mt: 2 } : { display: "none" }}
        >
          <Card sx={{ background: "#666666" }}>
            {element.image_path && (
              <CardMedia
                sx={{
                  height: 140,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center"
                }}
                image={imageUrl(element.image_path)}
                title="green iguana"
                for={element.id}
              />
            )}
            <CardActions>
              <Checkbox
                disabled
                checked={
                  given_answer_id.includes(element.id)
                    ? true
                    : element.correctAnswer == 1
                    ? true
                    : false
                }
                sx={{
                  "&.MuiButtonBase-root": {
                    color:
                      element.correctAnswer == 1 && given_answer_id.includes(element.id)
                        ? "#90CF8E"
                        : element.correctAnswer == 1 && !given_answer_id.includes(element.id)
                        ? "#90CF8E"
                        : element.correctAnswer != 1 && given_answer_id.includes(element.id)
                        ? "#ee6b6e"
                        : ""
                  }
                }}
              />
              <h3 style={{ color: "white", fontWeight: "bold" }}>{element.text}</h3>
            </CardActions>
          </Card>
        </Grid>
      )}
    </>
    // {/* </Grid> */}
  );
}

export default AnswerCardShow;
