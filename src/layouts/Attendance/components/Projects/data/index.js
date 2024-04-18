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
  const [allContactsData, setAllContactsData] = useState([
    {
      id: "EMP001",
      name: "John Doe",
      role: "Employee",
      date: "2024-01-01",
      status: "Present",
      timeIn: "09:00",
      timeOut: "17:00",
      totalHours: 8,
      remarks: "-",
    },
    {
      id: "EMP002",
      name: "Jane Smith",
      role: "Employee",
      date: "2024-01-01",
      status: "Present",
      timeIn: "09:15",
      timeOut: "17:30",
      totalHours: 8.25,
      remarks: "-",
    },
    {
      id: "EMP003",
      name: "Alice Johnson",
      role: "Intern",
      date: "2024-01-01",
      status: "Present",
      timeIn: "10:00",
      timeOut: "16:00",
      totalHours: 6,
      remarks: "-",
    },
    // Add more entries as needed
  ]);

  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Name", accessor: "name", width: "10%", align: "center" },
      { Header: "Role", accessor: "role", align: "center" },
      { Header: "Date", accessor: "date", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Time In", accessor: "timeIn", align: "center" },
      { Header: "Time Out", accessor: "timeOut", align: "center" },
      { Header: "Total Hours", accessor: "totalHours", align: "center" },
      { Header: "Remarks", accessor: "remarks", align: "center" },
    ],

    rows: allContactsData?.map((ele) => {
      let Rows = {
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {ele.name}
          </MDTypography>
        ),
        role: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {ele.role}
          </MDTypography>
        ),
        date: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {ele.date}
          </MDTypography>
        ),
        status: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {ele.status}
          </MDTypography>
        ),
        timeIn: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {ele.timeIn}
          </MDTypography>
        ),
        timeOut: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {ele.timeOut}
          </MDTypography>
        ),
        totalHours: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {ele.totalHours}
          </MDTypography>
        ),
        remarks: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {ele.remarks}
          </MDTypography>
        ),
      };

      return Rows;
    }),
  };
}
