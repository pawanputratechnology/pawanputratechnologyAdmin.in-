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

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import borders from "assets/theme/base/borders";
// import { signUp } from "authApi";
import { toast } from "react-toastify";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

import axios from "axios";
import { DateRangePicker, Stack } from "rsuite";
import "./style.css";

function Cover() {
  const [color, setColor] = useState({});
  const [userList, setUserList] = useState([]);
  const [student, setStudent] = useState(false);

  const validationSchema = student
    ? Yup.object().shape({
        name: Yup.string().required("required"),
        password: Yup.string().required("required"),
        email: Yup.string().email("Invalid email").required("required"),
        roleCode: Yup.string().required("required"),
        studentFees: Yup.string().required("required"),
        address: Yup.string().required("required"),
      })
    : Yup.object().shape({
        name: Yup.string().required("required"),
        password: Yup.string().required("required"),
        email: Yup.string().email("Invalid email").required("required"),
        roleCode: Yup.string().required("required"),
        salary: Yup.string().required("required"),
        address: Yup.string().required("required"),
      });
  const formik = useFormik({
    initialValues: student
      ? {
          name: "",
          email: "",
          password: "",
          roleCode: "employee",
          department: "webDeveloper",
          studentFees: "",
          joiningDate: new Date().toLocaleDateString(),
          address: "",
        }
      : {
          name: "",
          email: "",
          password: "",
          roleCode: "employee",
          department: "webDeveloper",
          salary: "",
          joiningDate: new Date().toLocaleDateString(),
          address: "",
        },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (userList?.map((ele) => ele.email).includes(values.email)) {
        toast.error("User is already exists");
      } else {
        axios
          .post(
            "https://pawanputratechnology-48873-default-rtdb.firebaseio.com/allUsersList.json",
            values
          )
          .then((res) => {
            if (res.status === 200) {
              toast.success("User Registrad Successfully");
              formik.resetForm();
              console.log(res);
            }
          })
          .catch((err) => console.log(err));
      }
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
    axios
      .get("https://pawanputratechnology-48873-default-rtdb.firebaseio.com/allUsersList.json")
      .then((res) => setUserList(Object.values(res.data)))
      .catch((err) => console.log(err));
  }, []);
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
    <DashboardLayout>
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={formik.handleSubmit}>
            <MDTypography variant="h6" gutterBottom>
              Add Leave Requests
            </MDTypography>

            <DateRangePicker />
            <br />

            <span style={{ fontSize: "10px" }}>
              Note:- Hear Select Your going to coming sift (go to First half and coming on Second
              Half)
            </span>
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

            <span style={{ fontSize: "10px" }}>
              Note:- Hear Select Your Leave Type (Leave For Marriage...)
            </span>
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
            <MDInput multiline label="Description" fullWidth />

            <MDButton type="submit" variant="gradient" color="info">
              Add Leave
            </MDButton>
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default Cover;

{
  /*
<MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>

            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>

             <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          // mx={2}
          // mt={-3}
          // p={3}
          // mb={1}
          py={3}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign Up
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
*/
}
