import {useState} from "react";
import {Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import {Link, useHref} from "react-router-dom";
import {Path} from "react-router-dom";
import {tokens} from "../../Theme.tsx";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import {MenuOutlined} from "@mui/icons-material";
import newLogo from "../../assets/Asset-6-01-1.svg"

interface ItemProps {
  title: string;
  to: string | Partial<Path>;
  icon: any;
  selected: string;
  setSelected: (value: (((prevState: string) => string) | string)) => void;
}
const Item = ({ title, to, icon, selected, setSelected}: ItemProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
          <MenuItem
              active={selected === title}
              style={{
                  color: colors.gray[100],
                  textDecoration:"none",
              }}
              onClick={()=> setSelected(title)}
              icon={icon}
              component={<Link to={to}/>}
          >
              <Typography>{title}</Typography>
          </MenuItem>
  )
}

const sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");

  return (
      <Box
          sx={{
              "& .ps-sidebar-container": {
                  background: `${colors.primary[400]} !important`,
              },
              "& .ps-menu-button:hover": {
                  backgroundColor: `${colors.primary[400]} !important`,
                  color: "#868dfb !important",
              },
              "& .ps-menu-button .ps-active": {
                  color: "#6870fa !important",
              },
          }}
      >
        <Sidebar collapsed={isCollapsed} style={{height: "100vh"}} backgroundColor={colors.primary[400]}>
          <Menu iconShape="square">
              {/*LOGO AND MENU ICON*/}
              <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlined /> : undefined}
                style={{
                    margin: "10px 0 20px 0",
                    color: colors.gray[100],
                }}
              >
                  {!isCollapsed && (
                      <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          ml="15px"
                      >
                          <Typography variant="h6" color={colors.gray[100]}>
                              ADMINIS
                          </Typography>
                          <IconButton onClick={() => setIsCollapsed(!isCollapsed)} >
                              <MenuOutlined />
                          </IconButton>
                      </Box>
                  )}
              </MenuItem>

              {/*USER*/}
              {!isCollapsed && (
                  <Box mb="25px">
                      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                          <img
                          alt={"profile-user"}
                          width={"100px"}
                          height={"100px"}
                          src={newLogo}
                          style={{cursor: "pointer", borderRadius: "50%"}}
                          />
                      </Box>

                      <Box textAlign="center">
                          <Typography variant="h5" color={colors.gray[100]} fontWeight="bold" sx={{m: "10px 0 0 0"}}>John Doe</Typography>
                          <Typography variant="subtitle1" color={colors.greenAccent[500]}>Admin</Typography>
                      </Box>
                  </Box>
              )}

              {/*MENU ITEMS*/}
              <Box
                  paddingLeft = {isCollapsed ? undefined : "10% "}
                  sx={{
                      "& .MuiBox-root .ps-menuitem-root": {
                          color: colors.gray[100]
                      }
                  }}
              >
                  <Item title="Dashboard" to="/" icon={<HomeOutlinedIcon/>} selected={selected} setSelected={setSelected}/>
                  <Item title="Collaborateurs" to="/Collaborateurs" icon={<PeopleOutlinedIcon/>} selected={selected} setSelected={setSelected}/>
                  <Item title="Absences" to="/Absences" icon={<ScheduleOutlinedIcon/>} selected={selected} setSelected={setSelected}/>
              </Box>
          </Menu>
        </Sidebar>
      </Box>
  )
};

export default sidebar;