import {useEffect, useState} from "react";
import {Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {Path} from "react-router-dom";
import {tokens} from "../../Theme.tsx";
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import {MenuOutlined} from "@mui/icons-material";
import newLogo from "../../assets/Asset-6-01-1.svg"
import {useCookies} from "react-cookie";
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
  const [cookies] = useCookies([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");

    useEffect(() => {
        const jwt = cookies.jwt;

        if (jwt) {
            setIsConnected(true)
        } else {
            setIsConnected(false)
        }

    }, [])


    return (
      <Box
          sx={{
              "& .css-1wvake5": {
                  borderColor: `${colors.gray[700]} !important`,
              },
              "& .ps-sidebar-container": {
                  background: `${colors.primary[400]} !important`,
              },
              "& .ps-menu-button:hover": {
                  backgroundColor: `${colors.primary[400]} !important`,
                  color: `${colors.greenAccent[400]} !important`,
              },
              "& .ps-menu-button .ps-active": {
                  color: `${colors.greenAccent[500]} !important`,
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
                          {isConnected ?
                              <Typography variant="h6" color={colors.gray[100]}>
                                  ADMIN
                              </Typography> :
                              <Typography variant="h6" color={colors.gray[100]}>
                                  UTILISATEUR
                              </Typography>
                          }
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
                          style={{borderRadius: "50%"}}
                          />
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
                  <Item title="Dashboard" to="/" icon={<DonutSmallIcon/>} selected={selected} setSelected={setSelected}/>
                  <Item title="Collaborateurs" to="/collaborateurs" icon={<PeopleOutlinedIcon/>} selected={selected} setSelected={setSelected}/>
                  <Item title="Absences" to="/absences" icon={<ScheduleOutlinedIcon/>} selected={selected} setSelected={setSelected}/>
                  <Item title="Calendrier" to="/calendar" icon={<CalendarMonthOutlinedIcon/>} selected={selected} setSelected={setSelected}/>
              </Box>
          </Menu>
        </Sidebar>
      </Box>
  )
};

export default sidebar;