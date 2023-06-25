import {
    Avatar,
    Box,
    Stack,
    Table,
    TableCell,
    TableContainer,
    TableBody,
    TableRow,
    useTheme, Button, Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import { tokens } from "../../Theme.tsx";
import Header from "../../Components/Header.tsx";
import {Link, useParams} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import {HttpClient} from "../../utils/request.ts";
import {UserType} from "../../Types/UserType.tsx";

const ViewUser = () => {
    const { userId } = useParams();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [user, setUser] = useState<UserType>(null)

    useEffect(() => {
        HttpClient.get("/user/"+ userId).then(res => {
            let receivedData = res.data;

            if (receivedData.success === true) {
                setUser(receivedData.data);
            }
        });
    }, [userId]);

    return (
        <Box m="20px">
            <Header title="DETAILS COLLABORATEUR" subtitle={`Consultation des informations personnelles de ${user?.firstName} ${user?.lastName}`} />
        <Box m="40px 0 0 0" height="58vh">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="relative"
            >
                <Avatar
                    sx={{
                        borderRadius: "50%",
                        width: "100px",
                        height: "100px",
                    }}
                />

            </Box>
            <Box display="flex" justifyContent="center">
                <Stack spacing={2} mt={5}>
                    <TableContainer>
                        <Table sx={{
                            backgroundColor: `${colors.primary[900]}`,
                            borderRadius: "20px",
                            '&:last-child td, &:last-child th': { border: 0 }
                        }}>
                            <TableBody>
                                {
                                        <>
                                            <TableRow>
                                                <TableCell align="left">Nom</TableCell>
                                                <TableCell>{user?.lastName}</TableCell>
                                            </TableRow>
                                            <TableRow >
                                                <TableCell align="left">Prénom</TableCell>
                                                <TableCell>{user?.firstName}</TableCell>
                                            </TableRow>
                                            <TableRow >
                                                <TableCell align="left">Adresse mail</TableCell>
                                                <TableCell>{user?.email}</TableCell>
                                            </TableRow>
                                            <TableRow >
                                                <TableCell align="left">Date de naissance</TableCell>
                                                <TableCell>{user?.birth}</TableCell>
                                            </TableRow>
                                            <TableRow >
                                                <TableCell align="left">Adresse</TableCell>
                                                <TableCell>{user?.adresse}</TableCell>
                                            </TableRow>
                                            <TableRow >
                                                <TableCell align="left">Numéro de téléphone</TableCell>
                                                <TableCell>{user?.phone}</TableCell>
                                            </TableRow>
                                            <TableRow >
                                                <TableCell align="left">Expérience Professionnelle</TableCell>
                                                <TableCell>{user?.exp_pro}</TableCell>
                                            </TableRow>
                                            <TableRow >
                                                <TableCell align="left">Expérience à MonarkIT</TableCell>
                                                <TableCell>{user?.exp_mit}</TableCell>
                                            </TableRow>
                                        </>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Stack>

            </Box>
            <Box m="50px 0 0 0" display="flex" justifyContent="flex-end" alignItems="flex-end">
                <Link to={"/absence/user/new/" + userId} style={{textDecoration:"none", color: colors.gray[100]}}>
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
                <Link to={"/solde/" + userId} style={{textDecoration:"none", color: colors.gray[100]}}>
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
                <Link to={"/absence/user/"+ userId} style={{textDecoration:"none", color: colors.gray[100]}}>
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

