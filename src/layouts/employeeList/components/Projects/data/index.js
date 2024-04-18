/* eslint-disable prettier/prettier */
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
  const [allLeaveData, setAllLeaveData] = useState([]);
  const [messagesKeys, setMessagesKeys] = useState([]);

 function getData(){
    axios
    .get("https://pawanputratechnology-48873-default-rtdb.firebaseio.com/allUsersList.json")
    .then((res) => {
      setAllLeaveData(Object.values(res.data));
      setMessagesKeys(Object.keys(res.data));
    })
    .catch((err) => console.log(err));
   }
  useEffect(() => {
    getData();
  }, []);

  const DeleteData = (index) => { 
    axios
    .delete(
      "https://pawanputratechnology-48873-default-rtdb.firebaseio.com/allUsersList/" +
        messagesKeys?.at(index - 1) + ".json"
    )
    .then((res) => {
     
      if (res.status === 200) {
        getData();
        toast.success("Your Message Delete After 5 Seconds");
      }
    })
    .catch((err) => console.log(err));
  };

  return {
    columns: [
      { Header: "Name", accessor: "name", width: "10%", align: "left" },
      { Header: "Address", accessor: "address", width: "20%", align: "center" },
      { Header: "Department", accessor: "department", width: "20%", align: "center" },
      { Header: "Email", accessor: "email", align: "center" },
      { Header: "JoiningDate", accessor: "joiningDate", align: "center" },
      { Header: "Password", accessor: "password", align: "center" },
      { Header: "RoleCode", accessor: "roleCode", align: "center" },
      { Header: "Salary", accessor: "salary", align: "center" },
      { Header: "Action", accessor: "Action", align: "center" },
    ],

    rows: allLeaveData?.map((leave, index) => {
      let Rows = {
        name: (
          <MDTypography key={index} variant="caption" color="text" fontWeight="medium">
            {leave.name}
          </MDTypography>
        ),
        address: (
          <MDTypography key={index} variant="caption" color="text" fontWeight="medium">
            {leave.address}
          </MDTypography>
        ),
        department: (
          <MDTypography key={index} variant="caption" color="text" fontWeight="medium">
            {leave.department}
          </MDTypography>
        ),
        email: (
          <MDTypography key={index} variant="caption" color="text" fontWeight="medium">
            {leave.email}
          </MDTypography>
        ),
        joiningDate: (
          <MDTypography key={index} variant="caption" color="text" fontWeight="medium">
            {leave.joiningDate}
          </MDTypography>
        ),
        password: (
          <MDTypography key={index} variant="caption" color="text" fontWeight="medium">
            {leave.password}
          </MDTypography>
        ),
        roleCode: (
          <MDTypography key={index} variant="caption" color="text" fontWeight="medium">
            {leave.roleCode}
          </MDTypography>
        ),
        salary: (
          <MDTypography key={index} variant="caption" color="text" fontWeight="medium">
            {leave.salary}
          </MDTypography>
        ),
        Action: (
          <MDTypography key={index} sx={{cursor:"pointer"}} variant="caption" color="text" fontWeight="medium" onClick={() => DeleteData(index)}>
            Delete
          </MDTypography>
        ),
      };

      return Rows;
    }),
  };
}
