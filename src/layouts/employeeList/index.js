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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/Leave/data/reportsBarChartData";
import reportsLineChartData from "layouts/Leave/data/reportsLineChartData";

// Dashboard components
import OrdersOverview from "layouts/Leave/components/OrdersOverview";
import MDButton from "components/MDButton";

import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import MDAlertCloseIcon from "components/MDAlert/MDAlertCloseIcon";
import { DateRangePicker } from "rsuite";
import MDInput from "components/MDInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import MDTypography from "components/MDTypography";
import Projects from "./components/Projects";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function EmployeeList() {
  const { sales, tasks } = reportsLineChartData;

  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [color, setColor] = useState({});
  const [userList, setUserList] = useState([]);
  const [student, setStudent] = useState(false);

  const validationSchema = Yup.object().shape({
    // leaveDate: Yup.string().required("required"),
    shiftCode: Yup.string().required("required"),
    leaveTypeCode: Yup.string().required("required"),
  });
  const formik = useFormik({
    initialValues: {
      leaveDate: state,
      shiftCode: "",
      leaveTypeCode: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // axios
      //   .post(
      //     "https://pawanputratechnology-48873-default-rtdb.firebaseio.com/allUsersList.json",
      //     values
      //   )
      //   .then((res) => {
      //     if (res.status === 200) {
      //       toast.success("User Registrad Successfully");
      //       console.log(res);
      //     }
      //   })
      //   .catch((err) => console.log(err));
      // alert(JSON.stringify(values, null, 2));
      // try {
      //   await signUp(values.name, values.email, values.password);
      //   toast.success("Sign up successful!");
      //   // Redirect or update UI upon successful sign-up
      // } catch (error) {
      //   console.error(error.message);
      //   toast.error("Error signing up. Please try again.");
      // }
      // console.log(userList?.map((ele) => ele.email).includes(values.email));
    },
  });

  useEffect(() => {
    if (formik.values.name?.length > 0) {
      // Generate a random 3-digit number
      let randomNumber = Math.floor(Math.random() * 900) + 100;

      // Get the first letter of the name and convert it to uppercase
      let firstLetter = formik.values.name?.charAt(0).toUpperCase();

      // Define an array of special symbols
      let specialSymbols = ["@", "#"];

      // Choose a random special symbol from the array
      let randomSymbol = specialSymbols[Math.floor(Math.random() * specialSymbols.length)];

      // Concatenate the first letter, special symbol, and the random number
      let password = firstLetter + randomSymbol + randomNumber;

      // return password;
      formik.setFieldValue("password", password);
    }
  }, [formik.values.name]);

  useEffect(() => {
    if (formik.values.roleCode === "student") {
      setStudent(true);
    } else {
      setStudent(false);
    }
  }, [formik.values.roleCode]);

  return (
    <React.Fragment>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard color="dark" icon="weekend" title="Totel Leaves" count={3} />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard icon="leaderboard" title="This Month" count="2" />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard color="success" icon="store" title="Approved" count="3" />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="person_add"
                  title="Paid Leave"
                  count="0"
                />
              </MDBox>
            </Grid>
          </Grid>
          {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
          <MDButton variant="gradient" onClick={handleClickOpen} color="info">
            Add Leave
          </MDButton>*/}
          <MDBox>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Projects />
              </Grid>
              {/*<Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
                </Grid>*/}
            </Grid>
          </MDBox>
        </MDBox>

        <Footer />
      </DashboardLayout>

      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Leave Requests
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {/*<DateRangePicker block />*/}
              {/* <br />
              <span style={{ fontSize: "10px" }}>
                Note:- Hear Select Your going to coming sift (go to First half and coming on Second
                Half)
              </span> 
              // <DateRangePicker
              //   open={open}
              //   toggle={toggle}
              //   onChange={(range) => setDateRange(range)}
              // />*/}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth style={{ height: "2.8rem" }}>
                <InputLabel id="demo-simple-select-label">Select Shift</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="shiftCode"
                  value={formik.values.shiftCode}
                  label="Select Shift"
                  error={formik.errors.shiftCode}
                  onChange={formik.handleChange}
                  style={{ height: "2.8rem" }}
                >
                  <MenuItem value={"firstHalf"}>First Half</MenuItem>
                  <MenuItem value={"secondHalf"}>Second Half</MenuItem>
                </Select>
              </FormControl>
              {formik.errors.shiftCode && (
                <MDBox sx={{ color: "#F44335", fontSize: "15px" }}>{formik.errors.shiftCode}</MDBox>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth style={{ height: "2.8rem" }}>
                <InputLabel id="demo-simple-select-label">Leave Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="leaveTypeCode"
                  value={formik.values.leaveTypeCode}
                  label="Leave Type"
                  error={formik.errors.leaveTypeCode}
                  onChange={formik.handleChange}
                  style={{ height: "2.8rem" }}
                >
                  <MenuItem value={"casualLeave"}>Casual Leave (CL)</MenuItem>
                  <MenuItem value={"sickLeave"}>Sick Leave (SL)</MenuItem>
                  <MenuItem value={"maternity"}>Maternity Leave (ML)</MenuItem>
                  <MenuItem value={"marriage"}>Marriage Leave</MenuItem>
                  <MenuItem value={"other"}>Other</MenuItem>
                </Select>
              </FormControl>
              {formik.errors.leaveTypeCode && (
                <MDBox sx={{ color: "#F44335", fontSize: "15px" }}>
                  {formik.errors.leaveTypeCode}
                </MDBox>
              )}
            </Grid>
            <Grid item xs={12}>
              <MDInput
                multiline
                label="Description"
                fullWidth
                name="description"
                value={formik.values.description}
                // error={formik.errors.description}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <MDButton type="submit" onClick={formik.handleSubmit} variant="gradient" color="info">
            Add Leave
          </MDButton>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}

export default EmployeeList;
