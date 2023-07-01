import * as React from 'react';
import {Box, IconButton, ListItemIcon, Menu, MenuItem, useTheme} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import { ColorModeContext, tokens } from "../../Theme.tsx";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import lightLogo from "../../assets/Asset-1.svg"
import darkLogo from "../../assets/Asset-1-black.svg"
import {Logout} from "@mui/icons-material";
import {Login} from "@mui/icons-material";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies([])
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement | undefined>(null);
    const open = Boolean(anchorEl);
    const [isConnected, setIsConnected] = useState(false)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        removeCookie("jwt");
        return navigate("/login");
    };

    const logIn = () => {
        return navigate("/login");
    };

    useEffect(() => {
        const jwt = cookies.jwt;

        if (jwt) {
            setIsConnected(true)
        } else {
            setIsConnected(false)
        }

    }, [])

    return (
        <Box display="flex" justifyContent="space-between" p={2} backgroundColor={colors.primary[400]} >
        {/*LOGO*/}
        <Box display="flex">
            {theme.palette.mode === 'dark' ? (
                <img src={lightLogo} alt='MoanarkIT' width="215px"/>
            ) : (
                <img src={darkLogo} alt='MoanarkIT' width="215px"/>
            )}
        </Box>

        {/*ICONS*/}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <PersonOutlinedIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    PaperProps={{
                        elevation: 0,
                    }}
                >
                    {
                        isConnected ? <MenuItem onClick={logOut}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem> : <MenuItem onClick={logIn}>
                            <ListItemIcon>
                                <Login fontSize="small" />
                            </ListItemIcon>
                            Login
                        </MenuItem>
                    }
                </Menu>
            </Box>
    </Box>)
};

export default Topbar;