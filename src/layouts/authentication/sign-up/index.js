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
          roleCode: "student",
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
      <DashboardNavbar />
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={4}>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="Name"
                    variant="outlined"
                    name="name"
                    value={formik.values.name}
                    error={formik.errors.name}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.name && (
                    <MDBox sx={{ color: "#F44335", fontSize: "15px" }}>{formik.errors.name}</MDBox>
                  )}
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <MDBox mb={2}>
                  <MDInput
                    type="email"
                    label="Email"
                    variant="outlined"
                    value={formik.values.email}
                    error={formik.errors.email}
                    name="email"
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.email && (
                    <MDBox sx={{ color: "#F44335", fontSize: "15px" }}>{formik.errors.email}</MDBox>
                  )}
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    label="Password"
                    variant="outlined"
                    name="password"
                    value={formik.values.password}
                    error={formik.errors.password}
                    onChange={formik.handleChange}
                    disabled={true}
                    fullWidth
                  />
                  {formik.errors.password && (
                    <MDBox sx={{ color: "#F44335", fontSize: "15px" }}>
                      {formik.errors.password}
                    </MDBox>
                  )}
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <FormControl fullWidth style={{ height: "2.8rem" }}>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="roleCode"
                    value={formik.values.roleCode}
                    label="Role"
                    error={formik.errors.roleCode}
                    onChange={formik.handleChange}
                    style={{ height: "2.8rem" }}
                  >
                    <MenuItem value={"hr"}>HR</MenuItem>
                    <MenuItem value={"employee"}>Developer</MenuItem>
                    <MenuItem value={"student"}>Student</MenuItem>
                  </Select>
                </FormControl>
                {formik.errors.roleCode && (
                  <MDBox sx={{ color: "#F44335", fontSize: "15px" }}>
                    {formik.errors.roleCode}
                  </MDBox>
                )}
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <FormControl fullWidth style={{ height: "2.8rem" }}>
                  <InputLabel id="demo-simple-select-label">Department</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="department"
                    value={formik.values.department}
                    label="Department"
                    error={formik.errors.department}
                    onChange={formik.handleChange}
                    style={{ height: "2.8rem" }}
                  >
                    <MenuItem value={"webDeveloper"}>Web Developer</MenuItem>
                    <MenuItem value={"appDeveloper"}>Application Developer</MenuItem>
                    <MenuItem value={"uiuxDesiger"}>UI / UX Designer</MenuItem>
                  </Select>
                </FormControl>
                {formik.errors.department && (
                  <MDBox sx={{ color: "#F44335", fontSize: "15px" }}>
                    {formik.errors.department}
                  </MDBox>
                )}
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <MDBox mb={2}>
                  <MDInput
                    type="number"
                    label={student ? "Student Fees" : "Salary"}
                    variant="outlined"
                    name={student ? "studentFees" : "salary"}
                    value={student ? formik.values.studentFees : formik.values.salary}
                    error={student ? formik.errors.studentFees : formik.errors.salary}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {student
                    ? formik.errors.studentFees && (
                        <MDBox sx={{ color: "#F44335", fontSize: "15px" }}>
                          {formik.errors.studentFees}
                        </MDBox>
                      )
                    : formik.errors.salary && (
                        <MDBox sx={{ color: "#F44335", fontSize: "15px" }}>
                          {formik.errors.salary}
                        </MDBox>
                      )}
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <MDBox mb={2}>
                  <MDInput
                    type="date"
                    label="Joining Date"
                    variant="outlined"
                    name="joiningDate"
                    value={formik.values.joiningDate}
                    error={formik.errors.joiningDate}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.joiningDate && (
                    <MDBox sx={{ color: "#F44335", fontSize: "15px" }}>
                      {formik.errors.joiningDate}
                    </MDBox>
                  )}
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <MDBox mb={2}>
                  <MDInput
                    multiline
                    label="Address"
                    variant="outlined"
                    name="address"
                    value={formik.values.address}
                    error={formik.errors.address}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                  {formik.errors.address && (
                    <MDBox sx={{ color: "#F44335", fontSize: "15px" }}>
                      {formik.errors.address}
                    </MDBox>
                  )}
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={12} lg={12}>
                <MDBox mt={4} mb={1}>
                  <MDButton type="submit" variant="gradient" color="info" fullWidth>
                    Add new Employee
                  </MDButton>
                </MDBox>
              </Grid>
            </Grid>
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
