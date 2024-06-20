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
  Tooltip,
  tooltipClasses
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller } from "react-hook-form";
import ImageIcon from "@mui/icons-material/Image";
import InfoIcon from "@mui/icons-material/Info";
import HideImageIcon from "@mui/icons-material/HideImage";
import { styled } from "@mui/material/styles";
import axios from "axios.js";
import { toast } from "react-toastify";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 14
  }
});

const sharedStyles = {
  margin: "0px",
  padding: "0px",
  borderRadius: "50%",
  border: "1px solid #ccc",
  marginLeft: "10px",
  marginTop: "5px",
  marginBottom: "5px",
  marginRight: "5px",
  display: "inline-block",
  verticalAlign: "middle",
  objectFit: "cover",
  objectPosition: "center",
  backgroundColor: "#fff",
  boxShadow: "0 0 5px 0 rgba(0,0,0,.1)",
  transition: "box-shadow .3s",
  cursor: "pointer"
};

function AnswerCards({
  index2,
  index,
  control2,
  id,
  erros,
  type,
  answerDelete,
  getValues2,
  disabledAnswer,
  setValue2
}) {
  const radioButtonCheckedChange = (index) => {
    let answers = getValues2(`question.${index2}.answers`);
    answers.map((_, i) => {
      if (i === index) {
        setValue2(`question.${index2}.answers.${index}.correctAnswer`, 1);
      }
      if (i !== index) {
        setValue2(`question.${index2}.answers.${i}.correctAnswer`, 0);
      }
    });
  };

  const get_id = (index2, index) => {
    return getValues2(`question.[${index2}].answers.[${index}].id`);
  };

  const get_image_path = (index2, index) => {
    return getValues2(`question.[${index2}].answers.[${index}].image_path`);
  };

  const image_upload = (index2, index, e) => {
    let id = get_id(index2, index);
    console.log(e.target.files[0]);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("answer_id", id);
    axios
      .post("upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => {
        console.log(res.data);
        toast.success(
          "Resim Başarılı Bir şekilde Kaydedildi! Sayfayı Yenileyince Resimler Değişecektir"
        );
      })
      .catch((error) => {
        console.log(error);
        toast.error("Resim Yüklenirken Hata Oluştu!");
      });
  };

  const image_delete = (index2, index) => {
    let id = get_id(index2, index);

    const formData = new FormData();
    formData.append("answer_id", id);
    axios
      .post("delete-image", formData)
      .then((res) => {
        console.log(res.data);
        toast.success(
          "Resim Başarılı Bir şekilde Silindi! Sayfayı Yenileyince Resimler Değişecektir"
        );
      })
      .catch((error) => {
        console.log(error);
        toast.error("Resim Yüklenirken Hata Oluştu!");
      });
  };

  const imageUrlEditing = () => {
    if (window.location.hostname == "localhost")
      return `http://localhost:3000/Image/image-editing.png`;
    return `https://testifybackend.necatiarman.dev/Image/image-editing.png/`;
  };

  const imageUrlRemove = () => {
    if (window.location.hostname == "localhost")
      return `http://localhost:3000/Image/remove-image-photo-icon.svg`;
    return `https://testifybackend.necatiarman.dev/Image/remove-image-photo-icon.svg/`;
  };

  const imageUrl = (url) => {
    if (window.location.hostname == "localhost") return `http://localhost:8000/Image/` + url;
    return `https://testifybackend.necatiarman.dev/Image/` + url;
  };

  const image_style = {
    ...sharedStyles,
    filter: disabledAnswer ? "grayscale(100%)" : "none"
  };

  return (
    <Grid container spacing={3} key={id} sx={{ mb: 2 }}>
      <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
      <Grid item lg={1} md={1} sm={1} xs={1}>
        {type === 3 && (
          <Controller
            name={`question.${index2}.answers.${index}.correctAnswer`}
            control={control2}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                disabled={disabledAnswer}
                onChange={onChange}
                checked={value}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            )}
          />
        )}
        {type === 1 && (
          <Controller
            name={`question.${index2}.answers.${index}.correctAnswer`}
            control={control2}
            defaultValue={null}
            render={({ field: { value } }) => (
              <FormControlLabel
                value={value}
                checked={value}
                onChange={() => radioButtonCheckedChange(index)}
                control={<Radio disabled={disabledAnswer} />}
              />
            )}
          />
        )}

        {get_image_path(index2, index) != null && get_id(index2, index) != undefined && (
          <img
            src={imageUrl(get_image_path(index2, index))}
            width="20px"
            height="20px"
            onClick={() => {
              window.open(imageUrl(get_image_path(index2, index)), "_blank");
            }}
            style={image_style}
          />
        )}
      </Grid>

      <Grid item lg={8} md={8} sm={8} xs={8}>
        <Controller
          name={`question.${index2}.answers.${index}.text`}
          control={control2}
          render={({ field: { onChange, value } }) => (
            <TextField
              disabled={disabledAnswer}
              onChange={onChange}
              value={value}
              label={"Cevap - " + (index + 1)}
              fullWidth
              variant="outlined"
              error={
                erros?.question &&
                erros?.question[index2] &&
                erros?.question[index2]?.answers[index]
                  ? true
                  : false
              }
              helperText={
                erros?.question &&
                erros?.question[index2] &&
                erros?.question[index2]?.answers[index]
                  ? erros?.question[index2]?.answers[index]?.text?.message
                  : ""
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {disabledAnswer && (
                      <CustomTooltip title="Bu Şık Önceden Silinmiştir." placement="top">
                        <IconButton aria-label="delete" color="inherit">
                          <InfoIcon />
                        </IconButton>
                      </CustomTooltip>
                    )}
                    {get_id(index2, index) != undefined ? (
                      <>
                        <CustomTooltip
                          title={
                            get_image_path(index2, index) == null ? "Resim Ekle" : "Resim Güncelle"
                          }
                          placement="top"
                        >
                          <Button
                            component="label"
                            startIcon={
                              get_image_path(index2, index) == null ? (
                                <ImageIcon />
                              ) : (
                                <img src={imageUrlEditing()} width="25px" height="25px" />
                              )
                            }
                            sx={{ paddingLeft: 3 }}
                            disabled={disabledAnswer}
                          >
                            <input
                              type="file"
                              hidden
                              onChange={(e) => onChange(image_upload(index2, index, e))}
                            />
                          </Button>
                        </CustomTooltip>
                        {get_image_path(index2, index) != null && (
                          <CustomTooltip title="Resmi Sil" placement="top">
                            <IconButton
                              aria-label="delete"
                              color="error"
                              onClick={() => image_delete(index2, index)}
                            >
                              <img src={imageUrlRemove()} width="25px" height="25px" />
                            </IconButton>
                          </CustomTooltip>
                        )}
                      </>
                    ) : (
                      get_id(index2, index) == undefined && (
                        <CustomTooltip
                          title="Resim eklenebilmesi için lütfen ilk önce testi kaydediniz"
                          placement="top"
                        >
                          <IconButton aria-label="info" color="inherit">
                            <HideImageIcon />
                          </IconButton>
                        </CustomTooltip>
                      )
                    )}
                    <CustomTooltip title="Şıkkı Sil" placement="top">
                      <IconButton
                        aria-label="delete"
                        color="error"
                        disabled={disabledAnswer}
                        onClick={() => answerDelete(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CustomTooltip>
                  </InputAdornment>
                )
              }}
            />
          )}
        />
      </Grid>
      <Grid item lg={2} md={2} sm={2} xs={2}></Grid>
    </Grid>
  );
}

export default AnswerCards;
