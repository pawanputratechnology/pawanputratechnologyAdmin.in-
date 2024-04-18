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
import { Link, useNavigate, useParams } from "react-router-dom";

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

function ResetPassword() {
  //   const [email, setEmail] = useState("");
  const [conpassword, setconpassword] = useState("");
  const [password, setpassword] = useState("");
  const [click, setClick] = useState(false);
  const [userList, setUserList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const { key } = useParams();
  useEffect(() => {
    axios
      .get("https://pawanputratechnology-48873-default-rtdb.firebaseio.com/allUsersList.json")
      .then((res) => {
        setUserList(Object.values(res.data));
        setUsersList(Object.keys(res.data));
        // console.log(Object.keys(res.data).indexOf(key), key);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== "" || conpassword !== "") {
      if (password !== conpassword) {
        toast.error("please check your conform password");
      } else {
        let data = userList?.at(usersList.indexOf(key));
        data.password = password;
        //   console.log(userList?.at(usersList.indexOf(key)), data);
        axios
          .patch(
            "https://pawanputratechnology-48873-default-rtdb.firebaseio.com/allUsersList/" +
              key +
              ".json",
            data
          )
          .then((res) => {
            if (res.status === 200) {
              toast.success("password reset successfully");
              window.location.href = "sign-in";
            }
          }) // Log the response if successful
          .catch((err) => {
            if (err.response) {
              // The request was made and the server responded with a status code
              console.log("Server responded with status:", err.response.status);
              console.log("Error message:", err.response.data);
            } else if (err.request) {
              // The request was made but no response was received
              console.log("No response received from server");
            } else {
              // Something else happened in making the request
              console.log("Error in making the request:", err.message);
            }
          });
      }
    } else {
      toast.error("please enter your password & conform password");
    }

    // setClick(true);
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
            <MDBox mb={4}>
              <MDInput
                type="text"
                label="New Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                fullWidth
                required
              />
            </MDBox>

            <MDBox mb={4}>
              <MDInput
                type="text"
                label="Conform Password"
                value={conpassword}
                onChange={(e) => setconpassword(e.target.value)}
                fullWidth
                required
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
                Reset Password
              </MDButton>
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

export default ResetPassword;
