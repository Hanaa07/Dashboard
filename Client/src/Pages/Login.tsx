import React, {useState, useEffect, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {HttpClient} from "../utils/request.ts";
import {Box, Button, IconButton, TextField, Typography, useTheme} from "@mui/material";
import Header from "../Components/Header.tsx";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import {ColorModeContext, tokens} from "../Theme.tsx";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

function Login() {
    const [cookies] = useCookies([]);
    const navigate = useNavigate();
    const colorMode = useContext(ColorModeContext);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [values, setValues] = useState({ email: "", password: "" });
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<{email: string, password: string}>({ email: "", password: "" })
    const handleSubmit = async (event) => {
        setError(false)
        event.preventDefault();
        try {
            const { data } = await HttpClient.post(
                "/login",
                {
                    ...values,
                },
                { withCredentials: true }
            );
            if (data) {
                if (data.errors) {
                    setError(true)
                    setErrorMessage(data.errors);
                } else {
                    navigate("/");
                }
            }
        } catch (ex) {
            console.log(ex);
        }
    };

    useEffect(() => {
        if (cookies.jwt) {
            navigate("/");
        }
    }, [cookies, navigate]);

    return (
        <>
        <Box display="flex" justifyContent="flex-end" p={2}>
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
            </Box>
        </Box>
            <Box m="200px auto" sx={{backgroundColor: `${colors.blueAccent[700]}`, width: "400px", borderRadius: "20px"}}>
                <Box pt="30px" display="flex" justifyContent="center">
                    <Header title="Connexion" subtitle=""/>
                </Box>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Box display="flex" justifyContent="center">
                        <TextField
                            variant="standard"
                            type="email"
                            name="email"
                            label="Email"
                            placeholder="Email"
                            onChange={(e) =>
                                setValues({ ...values, [e.target.name]: e.target.value })
                            }
                        />
                    </Box>
                    <Box marginTop="20px" display="flex" justifyContent="center">
                        <TextField
                            variant="standard"
                            type="password"
                            placeholder="Password"
                            name="password"
                            label="Mot de passe"
                            onChange={(e) =>
                                setValues({ ...values, [e.target.name]: e.target.value })
                            }
                        />
                    </Box>
                    <Box display="flex" justifyContent="center" p="8px">
                        {
                            error && <span style={{color: 'red'}}>{
                                errorMessage.email ? errorMessage.email : errorMessage.password
                            }</span>
                        }
                    </Box>
                    <div style={{ display: "flex", justifyContent: "center",padding: "10px 20px" }}>
                        <Button
                            type={'submit'}
                            color = "secondary"
                            sx={{ backgroundColor: colors.greenAccent[700], color: colors.gray[100] }}
                            variant="contained"
                            disableElevation
                        >
                            <Typography variant="subtitle1">Valider</Typography>
                        </Button>
                    </div>
                    <Box style={{padding: "0 40px", justifyContent: "center"}}>
                        <Typography variant="subtitle1">Vous n'avez pas de compte ? Pas de souci notre site a un accés public!</Typography>
                    </Box>
                    <Box p="0 10px 20px 0" display="flex" justifyContent="flex-end" alignItems="flex-end">
                        <Link to="/">
                            <Button
                                variant="contained"
                                size="medium"
                                color = "secondary"
                                sx={{ backgroundColor: colors.greenAccent[700], color: colors.gray[100] }}
                                endIcon={<LockOpenOutlinedIcon/>}
                                disableElevation
                            >
                                <Typography variant="subtitle1">Entrer</Typography>
                            </Button>
                        </Link>
                    </Box>

                </form>
            </Box>
        </>
    );
}

export default Login;