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
import { toast } from "react-toastify";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import brand from "../../../assets/images/logo-ct.png";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import axios from "axios";

function ForgetPassword() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://pawanputratechnology-48873-default-rtdb.firebaseio.com/allUsersList.json")
      .then((res) => {
        setUserList(Object.values(res.data));
        setUsersList(Object.keys(res.data));
      })
      .catch((err) => console.log(err));
  }, []);
  //   const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { email: email };
    let conformation = userList.filter((ele) => ele.email === data.email).length > 0;

    // try {
    //   await signIn(email, password);
    //   toast.success("Logged in successfully!");
    //   navigate("/dashboard");
    //   // Redirect or update UI upon successful sign-in
    // } catch (error) {
    //   console.error(error.message);
    //   toast.error("Invalid email or password. Please try again.");
    // }
    if (email === "") {
      alert("enter your email !");
    } else {
      if (conformation) {
        localStorage.setItem("User", data.email);
        let { name, email } = userList.find((ele) => ele.email === data.email);
        //   navigate("/dashboard");
        let userData = {
          name,
          email,
          keys: usersList?.at(userList.findIndex((ele) => ele.email === data.email)),
        };
        //   .post("https://mailapi-p3r2.onrender.com/send-email", userData, {
        axios
          .post("https://mailapi-p3r2.onrender.com/send-email", userData, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*", // This sets the CORS header
            },
          })
          .then((res) => {
            if (res.status === 200) {
              toast.success("Request sended successffuly");
              setEmail("");
            } else {
              toast.error("Some essue to send request");
            }
          })
          .catch((err) => console.log(err));
        //   console.log();
      } else {
        alert("your email is not exist !");
      }
    }

    // console.log(
    //   conformation,
    //   userList.filter((ele) => ele.email === data.email && ele.password === data.password)
    // );
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          // bgColor="linear-gradient(165deg, #ff9442, #ff5e33)"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
          style={{ background: "linear-gradient(165deg, #ff9442, #ff5e33)" }}
        >
          <MDBox
            style={{ background: "#894024", borderRadius: "8px" }}
            component="img"
            src={brand}
            alt="Brand"
            width="11rem"
            mt={1}
          />
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                value={email}
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                Send Request
              </MDButton>
            </MDBox>
            <MDBox mt={4} mb={1} textAlign="center">
              <MDTypography
                variant="h5"
                // color="info"
                fullWidth
                onClick={() => {
                  navigate("/sign-in");
                }}
                sx={{ fontSize: "15px", cursor: "pointer" }}
              >
                Back To Sign-in
              </MDTypography>
            </MDBox>
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default ForgetPassword;
