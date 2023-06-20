import Header from "../../Components/Header.tsx";
import {Box, Button, FormControl, IconButton, MenuItem, Select, Typography, useTheme} from "@mui/material";
import {tokens} from "../../Theme.tsx";
import {DownloadOutlined} from "@mui/icons-material";
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import StatBox from "../../Components/StatBox.tsx";
import {DatePicker} from "@mui/x-date-pickers";
import React from "react";
import BarChart from "../../Components/BarChart.tsx";
import {mockDataContacts} from "../../data/mockData.tsx";
import LineChart from "../../Components/LineChart.tsx";
import PieChart from "../../Components/PieChart.tsx";
const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard"/>
                <Box>
                    <Button
                        color="secondary"
                        sx={{
                            backgroundColor: colors.greenAccent[700],
                            color: colors.gray[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                        variant="contained"
                        disableElevation
                    >
                        <DownloadOutlined/>
                        Download Reports
                    </Button>
                </Box>
            </Box>
            <Box
                display="grid"
                gridTemplateColumns="repeat(12,1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                <Box
                    gridColumn="span 3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox title="Select Date" component={<DatePicker sx={{
                        "& .css-13hkz5-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor : colors.gray[100],
                        }
                    }}/>}/>
                </Box>
                <Box
                    gridColumn="span 3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title="Select Collaborator"
                        component={
                            <>
                                <FormControl fullWidth sx={{
                                    "& .css-eday6k-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor : colors.gray[100],
                                    }}}>
                                <Select
                                    variant="outlined"
                                    displayEmpty
                                    defaultValue="all"
                                    sx={{width: "270px"}}
                                >
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value="intern">intern</MenuItem>
                                    <MenuItem value="employee">employee</MenuItem>
                                    <MenuItem value="admin">admin</MenuItem>
                                </Select>
                                </FormControl>
                            </>
                            }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title="Total employees"
                        component={
                            <Typography variant="subtitle2">15</Typography>
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title="Employee days absent"
                        component={
                            <Typography variant="subtitle2">1800</Typography>
                        }
                    />
                </Box>
            <Box
                gridColumn="span 6"
                gridRow="span 2"
                sx={{
                    backgroundColor: `${colors.primary[700]} transparent`,
                    backdropFilter: "blur(20px)",
                    borderRadius: "15px",
                    border: `1px solid ${colors.primary[700]}`,
                    padding: "5px"
                }}
            >
                <Box
                    mt="10px"
                    p="0 30px"
                    display="flex "
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            sx={{ padding: "5px 10px 0 0px" }}
                        >
                            Employees by Experience and Designation
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                            color={colors.greenAccent[500]}
                        >
                            Drill down years to see the employees by designation
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton>
                            <OpenInFullOutlinedIcon
                                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                            />
                        </IconButton>
                    </Box>
                </Box>
                <Box height="250px" m="-20px 0 0 0">
                    <BarChart isDashboard={true} />
                </Box>
            </Box>
                <Box
                    gridColumn="span 6"
                    gridRow="span 2"
                    sx={{
                        backgroundColor: `${colors.primary[700]} transparent`,
                        backdropFilter: "blur(20px)",
                        borderRadius: "15px",
                        border: `1px solid ${colors.primary[700]}`,
                        padding: "30px"
                    }}
                >
                    <Box
                        p="0 30px"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                    <Typography variant="subtitle1" fontWeight="bold">
                        Attendance percentage
                    </Typography>
                            <IconButton>
                                <OpenInFullOutlinedIcon
                                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                                />
                            </IconButton>
                    </Box>
                        <Box height="250px" m="-20px 0 0 0">
                        <PieChart/>
                        </Box>

                </Box>
                <Box
                    gridColumn="span 12"
                    gridRow="span 2"
                    sx={{
                        backgroundColor: `${colors.primary[700]} transparent`,
                        backdropFilter: "blur(20px)",
                        borderRadius: "15px",
                        border: `1px solid ${colors.primary[700]}`,
                    }}
                >
                    <Box
                        mt="10px"
                        p="0 30px"
                        display="flex "
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                color={colors.gray[100]}
                            >
                                Absences by Month
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                fontWeight="bold"
                                color={colors.greenAccent[500]}
                            >
                                Last 6 months
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton>
                                <OpenInFullOutlinedIcon
                                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                                />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box height="250px" m="-20px 0 0 0">
                        <LineChart isDashboard={true} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
export default Dashboard;