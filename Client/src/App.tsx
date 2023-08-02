import {ColorModeContext, useMode} from "./Theme.tsx";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {Routes, Route, useLocation} from "react-router-dom";
import { LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Topbar from "./Scenes/Global/Topbar.tsx";
import Dashboard from "./Scenes/Dashboard";
import Sidebar from "./Scenes/Global/Sidebar.tsx";
import Collaborateurs from "./Scenes/Collaborateurs";
import {useEffect, useState} from "react";
import Absences from "./Scenes/Absences"
import CreateUser from "./Scenes/UserForm/CreateUser.tsx";
import EditUser from "./Scenes/UserForm/EditUser.tsx";
import ViewUser from "./Scenes/ViewUser";
import SoldeUser from "./Scenes/SoldeUser";
import "react-datepicker/dist/react-datepicker.css"
import AbsenceUser from "./Scenes/AbsenceUser";
import CreateSolde from "./Scenes/SoldeForm/CreateSolde.tsx";
import EditSolde from "./Scenes/SoldeForm/EditSolde.tsx";
import CreateAbsence from "./Scenes/AbsenceForm/CreateAbsence.tsx";
import Login from "./Pages/Login.tsx";
import EditAbsence from "./Scenes/AbsenceForm/EditAbsence.tsx";
import Calendar from "./Scenes/Calendar/calendar.tsx";
import backgroundLogo from "./assets/Asset-6-01-1.svg";
import Error from "./Pages/Error.tsx";

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState<boolean>(true);
    const [isLoginRoute, setIsLoginRoute] = useState<boolean>(false);
    const [isConnected, setIsConnected] = useState(false);
    let location = useLocation()


    useEffect(() => {
        if (location.pathname === '/login') {
            setIsLoginRoute(true)
        } else {
            setIsLoginRoute(false)
        }
    }, [location.pathname])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="app">
                        {isLoginRoute ? null : <Sidebar isSidebar={isSidebar} />}
                        <main className="content">
                            <Routes>
                                <Route path="/login" element={<Login/>}/>
                            </Routes>
                            {!isLoginRoute && <Topbar setIsSidebar={setIsSidebar} />}
                            <Routes>
                                <Route path="/" element={<Dashboard />}/>
                                <Route path="/collaborateurs" element={<Collaborateurs />}/>
                                <Route path="/user/new" element={<CreateUser/>}/>
                                <Route path="/user/:userId/edit" element={<EditUser/>}/>
                                <Route path="/user/:userId/absence/new" element={<CreateAbsence/>} />
                                <Route path="/user/:userId/absence/:absenceId/edit" element={<EditAbsence/>} />
                                <Route path={"/user/:userId/solde/new"} element={<CreateSolde/>}/>
                                <Route path="/user/:userId/solde/:soldeId/edit" element={<EditSolde/>}/>
                                <Route path="/calendar" element={<Calendar/>}/>
                                <Route path="/user/:userId" element={<ViewUser/>} />
                                <Route path="/user/:userId/solde" element={<SoldeUser/>} />
                                <Route path="/user/:userId/absences" element={<AbsenceUser/>} />
                                <Route path="/absences" element={<Absences/>}/>
                            </Routes>
                        </main>
                    </div>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </LocalizationProvider>
    )
}

export default App