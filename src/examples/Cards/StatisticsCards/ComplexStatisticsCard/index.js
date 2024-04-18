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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Grid } from "@mui/material";

function ComplexStatisticsCard({ color, title, count, percentage, icon }) {
  return (
    <Card style={{ background: "linear-gradient(165deg, #ff9442, #ff5e33)" }}>
      <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12} textAlign="right">
            <MDBox
              style={{
                boxShadow: "0 3px 10px rgb(0 0 0 / 31%)",
                width: "3rem",
                borderRadius: "6px",
                marginTop: "-23px",
                background: "linear-gradient(165deg, rgb(255, 148, 66), rgb(255, 94, 51))",
                height: "42px",
                padding: "5px",
              }}
              textAlign="center"
            >
              <MDTypography variant="h7" color="light">
                {count}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <MDBox lineHeight={1.25}>
              <MDTypography textAlign="right" variant="h5" fontWeight="light" color="light">
                <b>{title}</b>
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>{" "}
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of ComplexStatisticsCard
ComplexStatisticsCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

// Typechecking props for the ComplexStatisticsCard
ComplexStatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
};

export default ComplexStatisticsCard;
