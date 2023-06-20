import { Box, useTheme } from "@mui/material";
import { tokens } from "../Theme.tsx";

const ProgressSemiCircle = ({ progress = "0.75", size = "40" }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const angle = progress * 180;
    return (
        <Box
            sx={{
                background: `radial-gradient(${colors.primary[500]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
            ${colors.greenAccent[500]}`,
                backdropFilter: "blur(9px)",
                borderRadius: "50%",
                width: `${size}px`,
                height: `${size}px`,
            }}
        />
    );
};

export default ProgressSemiCircle;