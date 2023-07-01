import {Box, Typography, useTheme} from "@mui/material";
import {tokens} from "../Theme.tsx";

type StatBoxProps = {
    title: string,
    component: any,
}

const StatBox = (props: StatBoxProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {title, component} = props;
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '160px',
                width: '400px',
                backgroundColor: `${colors.primary[700]} transparent`,
                backdropFilter: "blur(20px)",
                borderRadius: "15px",
                border: `1px solid ${colors.primary[700]}`
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '16px',
                }}
            >
                <Box>
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ color: `${colors.gray[100]}`}} // Replace with your desired text color
                    >
                        {title}
                    </Typography>
                </Box>
                <Box>
                    {component}
                </Box>
            </Box>
        </Box>

    )
}

export default StatBox;