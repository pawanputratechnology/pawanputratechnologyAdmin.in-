/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDInput from "components/MDInput";
import {
  Avatar,
  Button,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import DeletConformation from "components/MDModal/DeletConformation";
import { setOpenConfigurator } from "context";
import axios from "axios";
import { red } from "@mui/material/colors";
import { toast } from "react-toastify";

const userLogId = localStorage.getItem("User");

const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
  "Sedna",
  "Titania",
  "Triton",
  "Umbriel",
];

const ITEM_HEIGHT = 48;
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Notifications() {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [message, setMessage] = useState(" ");
  const [messages, setMessages] = useState([]);
  const [messagesKeys, setMessagesKeys] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editMassage, setEditMassage] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [indexForDelete, setIndexForDelete] = useState(null);
  const [messagesList, setMessagesList] = useState([]);
  const [indexEdit, setIndexEdit] = useState(null);
  const handleClick = (event, indexs) => {
    setOpen(!open);
    setAnchorEl(event.currentTarget);
    setIndexEdit(indexs);
    setEditMassage(messages.find((ele) => ele.msgId === indexs)?.msg);
    console.log(indexs, "indexsindexsindexs");
  };
  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
    !edit && setIndexEdit(null);
  };

  const openConformationModel = () => setOpenModel(true);
  const handleCloseModal = () => setOpenModel(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  useEffect(() => {
    // if (messages.length > 0) {
    let getMsg = setInterval(() => {
      if (!edit) {
        axios
          .get("https://pawanputratechnology-48873-default-rtdb.firebaseio.com/notifications.json")
          .then((res) => {
            let data = Object.values(res.data);
            // console.log(data);
            if (data.length !== messages.length) {
              setMessages(Object.values(res.data));
              setMessagesKeys(Object.keys(res.data));
              axios
                .get(
                  "https://pawanputratechnology-48873-default-rtdb.firebaseio.com/allUsersList.json"
                )
                .then((res) => {
                  if (messagesList?.lengh < 0) {
                    setMessagesList(Object.values(res.data));
                  } else {
                    // let emailList=messagesList.map(ele=> ele.email)
                    if (Object.values(res.data).length !== messagesList?.length) {
                      setMessagesList(Object.values(res.data));
                    }
                  }
                  // console.log(res);
                })
                .catch((err) => console.log(err));
            }
            // console.log(res);
          })
          .catch((err) => console.log(err));
      }
    }, 5000);
    // } else {
    //   axios
    //     .get("https://pawanputratechnology-48873-default-rtdb.firebaseio.com/notifications.json")
    //     .then((res) => {
    //       let data = Object.values(res.data).map((ele) => ele.msgId);
    //       console.log(data);
    //       // setMessages(Object.values(res.data));
    //       // console.log(res);
    //     })
    //     .catch((err) => console.log(err));
    //   axios
    //     .get("https://pawanputratechnology-48873-default-rtdb.firebaseio.com/allUsersList.json")
    //     .then((res) => {
    //       setMessagesList(Object.values(res.data));
    //       // console.log(res);
    //     })
    //     .catch((err) => console.log(err));
    // }
    return () => {
      clearInterval(getMsg);
    };
  }, []);

  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      A simple {name} alert with{" "}
      <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        an example link
      </MDTypography>
      . Give it a click if you like.
    </MDTypography>
  );

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const renderWarningSB = (
    <MDSnackbar
      color="warning"
      icon="star"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            {/*
           <Card>
              <MDBox p={2}>
                <MDTypography variant="h5">Alerts</MDTypography>
              </MDBox>
              <MDBox pt={2} px={2}>
                <MDAlert color="primary" dismissible>
                  {alertContent("primary")}
                </MDAlert>
                <MDAlert color="secondary" dismissible>
                  {alertContent("secondary")}
                </MDAlert>
                <MDAlert color="success" dismissible>
                  {alertContent("success")}
                </MDAlert>
                <MDAlert color="error" dismissible>
                  {alertContent("error")}
                </MDAlert>
                <MDAlert color="warning" dismissible>
                  {alertContent("warning")}
                </MDAlert>
                <MDAlert color="info" dismissible>
                  {alertContent("info")}
                </MDAlert>
                <MDAlert color="light" dismissible>
                  {alertContent("light")}
                </MDAlert>
                <MDAlert color="dark" dismissible>
                  {alertContent("dark")}
                </MDAlert>
              </MDBox>
            </Card>*/}
            <Card sx={{ padding: "3%" }}>
              <Grid container spacing={3}>
                {messages?.map((item, index) => (
                  <Grid item xs={12} sm={12} lg={12} key={item.msgId}>
                    <Card
                      sx={{
                        padding: "3%",
                        width: "30%",
                        marginTop: "1rem",
                        marginLeft: item.userId === userLogId ? "70%" : "0%",
                      }}
                      onClick={(e) => {
                        item.userId === userLogId && item.msgId !== indexEdit
                          ? handleClick(e, item.msgId)
                          : "";
                      }}
                    >
                      {item.userId === userLogId && item.msgId === indexEdit && edit ? (
                        <MDInput
                          multiline
                          value={editMassage}
                          onChange={(e) => setEditMassage(e.target.value)}
                        />
                      ) : (
                        // <IconButton
                        //   aria-label="more"
                        //   id="long-button"
                        //   aria-controls={open ? "long-menu" : undefined}
                        //   aria-expanded={open ? "true" : undefined}
                        //   aria-haspopup="true"
                        // >

                        <>
                          {item.userId !== userLogId && (
                            <CardHeader
                              avatar={
                                <Avatar
                                  sx={{ width: "30px", height: "30px", bgcolor: red[500] }}
                                  aria-label="recipe"
                                >
                                  {messagesList
                                    ?.find((ele) => ele.email === item.userId)
                                    ?.name?.at(0)}
                                </Avatar>
                              }
                              title={
                                <MDTypography variant="button" color="text" fontWeight="regular">
                                  {
                                    messagesList?.filter((ele) => ele.email === item.userId)?.at(0)
                                      ?.name
                                  }
                                </MDTypography>
                              }
                              subheader=""
                              sx={{
                                padding: "0",
                                marginBottom: "3px",
                                marginTop: "-12px",
                                marginLeft: "-12px",
                              }}
                            />
                          )}
                          <CardContent sx={{ padding: "0" }}>
                            <MDTypography variant="button" color="text" fontWeight="regular">
                              {item.msg}
                            </MDTypography>
                          </CardContent>
                        </>
                      )}
                      <div>
                        {indexEdit !== null && item.msgId === indexEdit && edit ? (
                          <Button
                            onClick={() => {
                              if (messages?.length > 0) {
                                let data = messages;
                                data[indexEdit - 1].msg = editMassage;
                                // setMessages(data);
                                // axios
                                //   .post(
                                //     "https://pawanputratechnology-48873-default-rtdb.firebaseio.com/notifications.json",
                                //     messages?.at(indexEdit - 1)=data
                                //   )
                                //   .then((res) => {
                                //     if (res.status === 200) {
                                axios
                                  .put(
                                    "https://pawanputratechnology-48873-default-rtdb.firebaseio.com/notifications/" +
                                      messagesKeys?.at(indexEdit - 1) +
                                      ".json",
                                    data.at(indexEdit - 1)
                                  )
                                  .then((response) => {
                                    console.log(response);
                                    setEditMassage("");
                                    setEdit(false);
                                    setIndexEdit(null);
                                  })
                                  .catch((err) => console.log(err));
                              }
                              // })
                              //       .catch((err) => console.log(err));
                              //   }
                            }}
                          >
                            Save
                          </Button>
                        ) : (
                          ""
                        )}
                      </div>
                    </Card>

                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        "aria-labelledby": "long-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "20ch",
                        },
                      }}
                    >
                      <MenuItem onClick={handleClose}>
                        <Button
                          onClick={() => {
                            // setEditMassage(item.msgId === indexEdit && item.msg);
                            setEdit(true);
                            console.log(indexEdit, item.msg, item.userId, item.msgId);
                          }}
                        >
                          <CreateIcon />
                        </Button>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Button
                          onClick={() => {
                            openConformationModel(true);
                            // setIndexForDelete(item.msgId);
                            setIndexForDelete(index);

                            // setMessages(
                            //   messages.filter((items) => items.msgId !== item.msgId)
                            // );
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </MenuItem>
                    </Menu>
                  </Grid>
                ))}
                <Grid item xs={12} sm={12} lg={12}>
                  <form>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={12} lg={10}>
                        <MDInput
                          multiline
                          label="Enter your message..."
                          fullWidth
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} lg={2}>
                        <MDButton
                          variant="gradient"
                          color="info"
                          fullWidth
                          onClick={() => {
                            let uId = localStorage.getItem("User");
                            let data = messages;
                            // setMessages([
                            //   ...data,
                            //   { userId: uId, msgId: messages.length + 1, msg: message },
                            // ]);
                            axios
                              .post(
                                "https://pawanputratechnology-48873-default-rtdb.firebaseio.com/notifications.json",
                                { userId: uId, msgId: messages.length + 1, msg: message }
                              )
                              .then((res) => {
                                if (res.status === 200) {
                                  // toast.success("User Registrad Successfully");
                                  axios
                                    .get(
                                      "https://pawanputratechnology-48873-default-rtdb.firebaseio.com/notifications.json"
                                    )
                                    .then((res) => {
                                      setMessages(Object.values(res.data));
                                      // console.log(res);
                                    })
                                    .catch((err) => console.log(err));
                                  formik.resetForm();
                                  // console.log(res);
                                }
                              })
                              .catch((err) => console.log(err));
                            setMessage("");
                          }}
                        >
                          Send
                        </MDButton>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/*<Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2} lineHeight={0}>
                <MDTypography variant="h5">Notifications</MDTypography>
                <MDTypography variant="button" color="text" fontWeight="regular">
                  Notifications on this page use Toasts from Bootstrap. Read more details here.
                </MDTypography>
              </MDBox>
              <MDBox p={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="success" onClick={openSuccessSB} fullWidth>
                      success notification
                    </MDButton>
                    {renderSuccessSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="info" onClick={openInfoSB} fullWidth>
                      info notification
                    </MDButton>
                    {renderInfoSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="warning" onClick={openWarningSB} fullWidth>
                      warning notification
                    </MDButton>
                    {renderWarningSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="error" onClick={openErrorSB} fullWidth>
                      error notification
                    </MDButton>
                    {renderErrorSB}
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>*/}
        </Grid>
      </MDBox>
      <Footer />
      <DeletConformation
        open={openModel}
        setOpen={setOpenModel}
        content={"Are you sucre you delete want to delete this message ?"}
        handleClose={handleCloseModal}
        handleYes={() => {
          // axios
          //   .get(
          //     "https://pawanputratechnology-48873-default-rtdb.firebaseio.com/notifications.json"
          //   )
          //   .then((res) => {
          //     // console.log(Object.keys(res.data)?.at(indexForDelete));
          axios
            .delete(
              "https://pawanputratechnology-48873-default-rtdb.firebaseio.com/notifications/" +
                messagesKeys?.at(indexEdit - 1) +
                ".json"
            )
            .then((res) => {
              // setMessages(Object.values(res.data));
              // if (res.status === 200) {
              //   // toast.success("User Registrad Successfully");
              //   formik.resetForm();
              //   // console.log(res);
              // }
              if (res.status === 200) {
                toast.success("Your Message Delete After 5 Seconds");
              }
            })
            .catch((err) => console.log(err));
          //     // console.log(res);
          //   })
          //   .catch((err) => console.log(err));
          // let msgs = messages.filter((items) => items.msgId !== indexForDelete);
          // // console.log(edit, "edit");
          // // setMessages(messages.filter((items) => items.msgId !== indexForDelete));
          // // axios
          // //   .delete(
          // //     "https://pawanputratechnology-48873-default-rtdb.firebaseio.com/notifications.json",
          // //     msgs
          // //   )
          // //   .then((res) => {
          // //     // setMessages(Object.values(res.data));
          // //     // if (res.status === 200) {
          // //     //   // toast.success("User Registrad Successfully");

          // //     //   formik.resetForm();
          // //     //   // console.log(res);
          // //     // }
          // //   })
          // //   .catch((err) => console.log(err));
          setIndexEdit(null);
          setIndexForDelete(null);
          handleCloseModal();
        }}
      />
    </DashboardLayout>
  );
}

export default Notifications;
