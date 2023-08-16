import Header from "../../Components/Header.tsx";
import {Box, FormControl, MenuItem, Select, Typography, useTheme} from "@mui/material";
import {tokens} from "../../Theme.tsx";
import StatBox from "../../Components/StatBox.tsx";
import {useEffect, useState} from "react";
import BarChart from "../../Components/BarChart.tsx";
import LineChart from "../../Components/LineChart.tsx";
import PieChart from "../../Components/PieChart.tsx";
import {useCookies} from "react-cookie";
import {HttpClient} from "../../utils/request.ts";
import {UserType} from "../../Types/UserType.tsx";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [users, setUsers] = useState([])
    const [cookies] = useCookies<any>([]);
    const [intervalType, setIntervalType] = useState< 1 | 3 | 6 | 12>(1)
    const [nbrTotalPresences, setNbrTotalPresences] = useState<number>(0);
    const [nbrUsers, setNbrUsers] = useState<number>(0)
    const [selectedUser, setSelectedUser] = useState<UserType|null>(null);
    const [absences, setAbsences] = useState([]);

    useEffect(() => {
        const jwt = cookies.jwt ? cookies.jwt : '';
        HttpClient.get("/user/", {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).then(res => {
            let receivedData = res.data;
            console.log(receivedData)

            if (receivedData.success === true) {
                setUsers(receivedData.data);
            }
        });
    }, []);

    useEffect(() => {
        HttpClient.post("/absence/stats", { userId: selectedUser?._id, intervalType: intervalType}).then(res => {
            let receivedData = res.data;

            console.log(res.data.data)

            if (receivedData.success === true) {
                setNbrTotalPresences(receivedData.data.nbrTotalPresences)
                setNbrUsers(receivedData.data.nbrUsers)
                setAbsences(receivedData.data.absences);
            }
        });
    }, [selectedUser, intervalType]);


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
                    <StatBox
                        title="Sélectionner date"
                        nbrUsers={null}
                        component={
                        <>
                            <FormControl size="small" sx={{
                                "& .css-eday6k-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: colors.gray[100],
                                }
                            }}>
                                <Select
                                    variant="outlined"
                                    displayEmpty
                                    defaultValue="1"
                                    onChange={ e => {
                                        // @ts-ignore
                                        setIntervalType(e.target?.value)
                                    }}
                                >
                                    <MenuItem value={1}>Ce mois</MenuItem>
                                    <MenuItem value={2}>Les 3 derniers mois</MenuItem>
                                    <MenuItem value={3}>Les 6 derniers mois</MenuItem>
                                    <MenuItem value={4}>Cette année</MenuItem>
                                </Select>
                            </FormControl>
                        </>
                    }/>
                </Box>
                <Box
                    gridColumn="span 3"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title="Sélectionner collaborateur"
                        nbrUsers={null}
                        component={
                            <>
                                <FormControl size="small" sx={{
                                    "& .css-eday6k-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: colors.gray[100],
                                    }
                                }}>
                                    <Select
                                        variant="outlined"
                                        defaultValue={0}
                                        onChange={ e => {
                                            // @ts-ignore
                                            setSelectedUser(e.target?.value)
                                        }}
                                    >
                                        <MenuItem value={0}>
                                            Tous
                                        </MenuItem>
                                        {users.map((user : any) => {
                                            return <MenuItem key={user._id} value={user}>{user?.lastName} {user?.firstName}</MenuItem>
                                        })}
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
                        nbrUsers={nbrUsers}
                        component={
                            <Typography variant="subtitle2">{nbrUsers}</Typography>
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
                        title={`Total des présences de ${intervalType === 1 ? ' ce mois' : intervalType === 3 ? ' ces 3 derniers mois' : intervalType === 6 ? ' ces 6 derniers mois' : ' cette année'}`}
                        nbrUsers={null}
                        component={
                            <Typography variant="subtitle2">{nbrTotalPresences}</Typography>
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 6"
                    gridRow="span 2"
                    sx={{
                        backgroundColor: `${colors.primary[400]}`,
                        borderRadius: "15px",
                        border: `1px solid ${colors.primary[400]}`,
                        padding: "5px"
                    }}
                >
                    <Box
                        mt="10px"
                        p="0 30px"
                    >
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                sx={{padding: "5px 10px 0 0px"}}
                            >
                                Top 3 des collaborateurs par présence
                            </Typography>
                    </Box>
                    <Box height="250px" m="-15px 0 0 20px">
                        <BarChart intervalType={intervalType} absence={absences} user={selectedUser}/>
                    </Box>
                </Box>
                <Box
                    gridColumn="span 6"
                    gridRow="span 2"
                    sx={{
                        backgroundColor: `${colors.primary[400]}`,
                        borderRadius: "15px",
                        border: `1px solid ${colors.primary[400]}`,

                    }}
                >
                    <Typography variant="subtitle1" fontWeight="bold" sx={{
                        margin: "20px"
                    }}>
                        Pourcentage de présence
                    </Typography>
                    <Box
                        m="-30px 0 0 5px"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <PieChart absences={absences} intervalType={intervalType} nbrTotalPresences={nbrTotalPresences}/>
                    </Box>
                </Box>
                <Box
                    display="flex"
                    flexDirection={'column'}
                    justifyContent="space-between"
                    gridColumn="span 12"
                    gridRow="span 2"
                    padding="16px"
                    sx={{
                        backgroundColor: `${colors.primary[400]}`,
                        borderRadius: "15px",
                        border: `1px solid ${colors.primary[400]}`,
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        color={colors.gray[100]}
                    >
                        Nombre d'absences pris
                        {
                            intervalType === 1 ? ' ce mois' : intervalType === 3 ? ' il y\'a 3 mois' : intervalType === 6 ? ' il y\'a 6 mois' : ' cette année'
                        }
                    </Typography>
                    {
                        selectedUser?._id ? <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                            color={colors.greenAccent[500]}
                        >
                            Pour l'utilisateur : {selectedUser?.lastName} {selectedUser?.firstName}
                        </Typography> : <></>
                    }
                    <Box height="250px" m="-15px 0 0 20px">
                        <LineChart absences={absences} intervalType={intervalType}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
export default Dashboard;