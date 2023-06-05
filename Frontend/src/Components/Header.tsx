import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../Theme.tsx";

interface HeaderProps {
    title: string,
    subtitle: string
}
const Header = ({title, subtitle}: HeaderProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography variant="h5" color={colors.gray[100]} fontWeight="bold" sx={{m: "0 0 5px 0"}}>
          {title}
      </Typography>
      <Typography variant="subtitle1" color={colors.greenAccent[500]}>
          {subtitle}
      </Typography>
  </Box>)
}

export default Header;
