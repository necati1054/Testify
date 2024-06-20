import React, { useState } from "react";
import {
  Card,
  Grid,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardHeader,
  Divider,
  Chip,
  Menu,
  MenuItem,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import axios from "axios.js";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TestShareSocialMedia from "./TestShareSocialMedia";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TestCards({ id, testName, created_at }) {
  const date = new Date(created_at);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openTransition, setOpenTransition] = useState(false);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const createdDate = date.toLocaleDateString("tr-TR", options);

  const gotoLookTest = (id) => {
    navigate("/testıcreated/looktest/" + id);
  };

  const gotoTestSolvers = (id) => {
    navigate("/testsolvers/" + id);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpenTransition(true);
    setAnchorEl(null);
  };

  const handleCloseTransition = () => {
    setOpenTransition(false);
  };

  return (
    <Grid item xs={12} md={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title={testName} />
        <Divider />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Oluşturulma Tarihi = {createdDate}
          </Typography>
        </CardContent>
        <CardActions sx={{ float: "right", display: "flex" }}>
          <Button size="small" onClick={() => gotoLookTest(id)}>
            Bak
          </Button>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button"
            }}
          >
            <MenuItem
              onClick={() => {
                gotoTestSolvers(id);
              }}
            >
              Çözenleri Gör
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClickOpen();
              }}
            >
              Paylaş
            </MenuItem>
          </Menu>
          <Dialog
            open={openTransition}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => handleCloseTransition()}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Oluşturduğunuz Testi Paylaşın"}</DialogTitle>
            <DialogContent>
              <TestShareSocialMedia id={id} testName={testName} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleCloseTransition()}>Kapat</Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default TestCards;
