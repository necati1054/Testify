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
  Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import ImageIcon from "@mui/icons-material/Image";

function SolverAnswerCardShow({ element, given_answer_id, type }) {
  // console.log("element", element);

  const styles = (theme) => ({
    radio: {
      "&$checked": {
        color: "#4B8DF8"
      }
    },
    checked: {}
  });
  return (
    <Grid container spacing={3} sx={element?.deleted_at == null ? { mt: 2 } : { display: "none" }}>
      <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
      <Grid item lg={1} md={1} sm={1} xs={1}>
        {/* <Checkbox
          checked={true}
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }} 6488EA ee6b6e
        /> */}
        {type == 1 && (
          <Radio
            disabled
            checked={
              element.id == given_answer_id ? true : element.correctAnswer == 1 ? true : false
            }
            sx={{
              "&.MuiButtonBase-root": {
                color:
                  element.correctAnswer == 1 && element.id == given_answer_id
                    ? "#90CF8E"
                    : element.correctAnswer == 1 && element.id != given_answer_id
                    ? "#90CF8E"
                    : element.correctAnswer != 1 && element.id == given_answer_id
                    ? "#ee6b6e"
                    : ""
              }
            }}
          />
        )}
        {type == 3 && (
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
                    : element.correctAnswer == 1 && given_answer_id.includes(element.id)
                    ? "#90CF8E"
                    : element.correctAnswer != 1 && given_answer_id.includes(element.id)
                    ? "#ee6b6e"
                    : ""
              }
            }}
          />
        )}
      </Grid>
      <Grid item lg={8} md={8} sm={8} xs={8}>
        <TextField value={element.text} label={"Cevap"} fullWidth variant="outlined" disabled />
      </Grid>
      <Grid item lg={2} md={2} sm={2} xs={2}></Grid>
    </Grid>
  );
}

export default SolverAnswerCardShow;
