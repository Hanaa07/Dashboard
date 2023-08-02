import {Box, Typography, useTheme} from "@mui/material";
import {tokens} from "../Theme.tsx";

type StatBoxProps = {
    title: string,
    component: any,
    nbrUsers: number | null
}

const StatBox = (props: StatBoxProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {title, component, nbrUsers} = props;

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '160px',
                width: '400px',
                backgroundColor: `${colors.primary[400]}`,
                borderRadius: "15px",
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
                        sx={{ color: `${colors.gray[100]}`}}
                    >
                        {title}
                    </Typography>
                </Box>
                <Box m="15px 0 0 0">
                    {component}
                </Box>
            </Box>
        </Box>

    )
}

export default StatBox;