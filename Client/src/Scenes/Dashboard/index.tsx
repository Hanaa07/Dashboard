import Header from "../../Components/Header.tsx";
import {Box, Button, FormControl, IconButton, MenuItem, Select, Typography, useTheme} from "@mui/material";
import {tokens} from "../../Theme.tsx";
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import StatBox from "../../Components/StatBox.tsx";
import {DatePicker} from "@mui/x-date-pickers";
import React from "react";
import BarChart from "../../Components/BarChart.tsx";
import LineChart from "../../Components/LineChart.tsx";
import PieChart from "../../Components/PieChart.tsx";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Bienvenue à votre tableau de bord"/>
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
                    <StatBox title="Sélectionner date" component={<DatePicker sx={{
                        "& .css-13hkz5-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: colors.gray[100],
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
                        title="Sélectionner collaborateur"
                        component={
                            <>
                                <FormControl fullWidth sx={{
                                    "& .css-eday6k-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: colors.gray[100],
                                    }
                                }}>
                                    <Select
                                        variant="outlined"
                                        displayEmpty
                                        defaultValue="tous"
                                        sx={{width: "270px"}}
                                    >
                                        <MenuItem value="tous">Tous</MenuItem>
                                        <MenuItem value="stagiaire">stagiaire</MenuItem>
                                        <MenuItem value="salarié">salarié</MenuItem>
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
                        title="Total des collaborateurs"
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
                        title="Total des absences des collaborateurs"
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
                                sx={{padding: "5px 10px 0 0px"}}
                            >
                                Salariés par Expérience
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                fontWeight="bold"
                                color={colors.greenAccent[500]}
                            >
                                Survoler les barres pour voir le total des salariés par expérience pour chaque période
                            </Typography>
                        </Box>
                    </Box>
                    <Box height="250px" m="-20px 0 0 0">
                        <BarChart isDashboard={true}/>
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
                            Pourcentage de présence
                        </Typography>
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
                                Absences par Mois
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                fontWeight="bold"
                                color={colors.greenAccent[500]}
                            >
                                Les 6 mois précédents
                            </Typography>
                        </Box>
                    </Box>
                    <Box height="250px" m="-20px 0 0 0">
                        <LineChart isDashboard={true}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
export default Dashboard;