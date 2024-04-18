/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import axios from "axios";

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const [allLeaveData, setAllLeaveData] = useState([
    {
      name: "John Doe",
      startDate: "2024-02-01",
      endDate: "2024-02-05",
      status: "Pending",
      reason: "Vacation",
    },
    {
      name: "Alice Johnson",
      startDate: "2024-02-10",
      endDate: "2024-02-15",
      status: "Approved",
      reason: "Family Event",
    },
    {
      name: "Jane Smith",
      startDate: "2024-03-01",
      endDate: "2024-03-03",
      status: "Rejected",
      reason: "Unspecified",
    },
    // Add more leave entries as needed
  ]);

  return {
    columns: [
      { Header: "Name", accessor: "name", width: "10%", align: "left" },
      { Header: "Start Date", accessor: "startDate", width: "20%", align: "center" },
      { Header: "End Date", accessor: "endDate", width: "20%", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Reason", accessor: "reason", align: "center" },
    ],

    rows: allLeaveData?.map((leave, index) => {
      let Rows = {
        name: (
          <MDTypography key={index} variant="caption" color="text" fontWeight="medium">
            {leave.name}
          </MDTypography>
        ),
        startDate: (
          <MDTypography key={index} variant="caption" color="text" fontWeight="medium">
            {leave.startDate}
          </MDTypography>
        ),
        endDate: (
          <MDTypography key={index} variant="caption" color="text" fontWeight="medium">
            {leave.endDate}
          </MDTypography>
        ),
        status: (
          <MDTypography key={index} variant="caption" color="text" fontWeight="medium">
            {leave.status}
          </MDTypography>
        ),
        reason: (
          <MDTypography key={index} variant="caption" color="text" fontWeight="medium">
            {leave.reason}
          </MDTypography>
        ),
      };

      return Rows;
    }),
  };
}
