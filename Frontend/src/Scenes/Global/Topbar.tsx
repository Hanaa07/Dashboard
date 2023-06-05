import {Box, IconButton, useTheme} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../Theme.tsx";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import lightLogo from "../../assets/Asset-1.svg"
import darkLogo from "../../assets/Asset-1-black.svg"

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

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
                {/*<IconButton>
                    <NotificationsOutlinedIcon/>
                </IconButton>
                    <IconButton>
                    <SettingsOutlinedIcon />
                    </IconButton>*/}
                <IconButton>
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>
    </Box>)
};

export default Topbar;