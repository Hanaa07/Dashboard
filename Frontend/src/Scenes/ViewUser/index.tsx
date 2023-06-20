import {
    Avatar,
    Box,
    Stack,
    Table,
    TableCell,
    TableContainer,
    TableBody,
    TableRow,
    useTheme, Button, Typography, Paper
} from "@mui/material";
import React, { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../Theme.tsx";
import Header from "../../Components/Header.tsx";
//import newLogo from "../../assets/Asset-6-01-1.svg";
import {Link} from "react-router-dom";
import {mockDataContacts} from "../../data/mockData.tsx";
import AddIcon from '@mui/icons-material/Add';

const ViewUser = () => {
    const [selected, setSelected] = useState<string>("ViewUser");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const currentUser = mockDataContacts.find((data) => data.id == 4);

    return (
        <Box m="20px">
            <Header title="DETAILS COLLABORATEUR" subtitle="Consultation des informations personnelles de Jane Doe" />
        <Box m="40px 0 0 0" height="58vh">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="relative"
            >
                <Avatar
                    src={"https://randomuser.me/api/portraits/women/79.jpg"}
                    alt="Jane Doe"
                    sx={{
                        cursor: "pointer",
                        borderRadius: "50%",
                        width: "100px",
                        height: "100px",
                    }}
                />

            </Box>
            <Box display="flex" justifyContent="center">
                <Stack spacing={2} mt={5}>
                    <TableContainer component={Paper}>
                        <Table sx={{
                            backdropFilter: "blur(5px)"}}>
                            <TableBody>
                                {
                                    currentUser ? (
                                        <>
                                            <TableRow>
                                                <TableCell align="left">Nom</TableCell>
                                                <TableCell>{currentUser.nom}</TableCell>
                                            </TableRow>
                                            <TableRow >
                                                <TableCell align="left">Prénom</TableCell>
                                                <TableCell>{currentUser.prenom}</TableCell>
                                            </TableRow>
                                            <TableRow >
                                                <TableCell align="left">Adresse mail</TableCell>
                                                <TableCell>{currentUser.adresse_mail}</TableCell>
                                            </TableRow>
                                            <TableRow >
                                                <TableCell align="left">Date de naissance</TableCell>
                                                <TableCell>{currentUser.birth}</TableCell>
                                            </TableRow>
                                            <TableRow >
                                                <TableCell align="left">Adresse</TableCell>
                                                <TableCell>{currentUser.adresse}</TableCell>
                                            </TableRow>
                                            <TableRow >
                                                <TableCell align="left">Numéro de téléphone</TableCell>
                                                <TableCell>{currentUser.num_tel}</TableCell>
                                            </TableRow>
                                            <TableRow >
                                                <TableCell align="left">Expérience Professionnelle</TableCell>
                                                <TableCell>{currentUser.exp_pro}</TableCell>
                                            </TableRow>
                                            <TableRow >
                                                <TableCell align="left">Expérience à MonarkIT</TableCell>
                                                <TableCell>{currentUser.exp_mit}</TableCell>
                                            </TableRow>
                                        </>
                                    ) : <></>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Stack>

            </Box>
            <Box m="50px 0 0 0" display="flex" justifyContent="flex-end" alignItems="flex-end">
                <Link to="/ViewUser/CreateAbsence" style={{textDecoration:"none", color: colors.gray[100]}}>
                    <Button
                        variant="contained"
                        size="medium"
                        color = "secondary"
                        style={{ marginRight: "10px" }}
                        sx={{ backgroundColor: colors.greenAccent[700], color: colors.gray[100] }}
                        startIcon={<AddIcon/>}
                        disableElevation
                    >
                        <Typography variant="body2">Ajouter une absence</Typography>
                    </Button>
                </Link>
                <Link to="/ViewUser/SoldeUser" style={{textDecoration:"none", color: colors.gray[100]}}>
                    <Button
                    variant="contained"
                    size="medium"
                    color = "secondary"
                    style={{ marginRight: "10px" }}
                    sx={{ backgroundColor: colors.greenAccent[700], color: colors.gray[100] }}
                    disableElevation
                    >
                        <Typography variant="body2">Voir son solde</Typography>
                    </Button>
                </Link>
                <Link to="/ViewUser/AbsenceUser" style={{textDecoration:"none", color: colors.gray[100]}}>
                    <Button
                        variant="contained"
                        size="medium"
                        color = "secondary"
                        sx={{ backgroundColor: colors.greenAccent[700], color: colors.gray[100] }}
                        disableElevation
                    >
                        <Typography variant="body2">Voir ses absences</Typography>
                    </Button>
                </Link>

            </Box>
        </Box>
        </Box>
    );
};

export default ViewUser;
