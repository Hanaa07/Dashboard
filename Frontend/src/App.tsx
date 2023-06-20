import {ColorModeContext, useMode} from "./Theme.tsx";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {Routes, Route} from "react-router-dom";
import { LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Topbar from "./Scenes/Global/Topbar.tsx";
import Dashboard from "./Scenes/Dashboard";
import Sidebar from "./Scenes/Global/Sidebar.tsx";
import Collaborateurs from "./Scenes/Collaborateurs";
import {useState} from "react";
import Absences from "./Scenes/Absences"
import CreateUser from "./Scenes/UserForm/CreateUser.tsx";
import EditUser from "./Scenes/UserForm/EditUser.tsx";
import SoldeForm from "./Scenes/SoldeForm/CreateSolde.tsx";
import AbsenceForm from "./Scenes/AbsenceForm/CreateAbsence.tsx";
import ViewUser from "./Scenes/ViewUser";
import SoldeUser from "./Scenes/SoldeUser";
import "react-datepicker/dist/react-datepicker.css"
import AbsenceUser from "./Scenes/AbsenceUser";
import CreateSolde from "./Scenes/SoldeForm/CreateSolde.tsx";
import EditSolde from "./Scenes/SoldeForm/EditSolde.tsx";
import CreateAbsence from "./Scenes/AbsenceForm/CreateAbsence.tsx";
import EditAbsence from "./Scenes/AbsenceForm/EditAbsence.tsx";
import Calendar from "./Scenes/Calendar/calendar.tsx";
import backgroundLogo from "./assets/Asset-6-01-1.svg"

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState<boolean>(true);

  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
              <CssBaseline />
      <div className="app"
           style={{
                   backgroundImage: `url(${backgroundLogo})`,
                   backgroundRepeat: "no-repeat",
                   backgroundSize: "45%",
                   backgroundPosition: "center",
                   position: "fixed",
                   display: "flex",
                   marginRight: "auto",
                   marginLeft: "auto",
                }}
      >
          <Sidebar isSidebar={isSidebar}/>
        <main className="content">
            <Topbar setIsSidebar={setIsSidebar}/>
            <Routes>
                <Route path="/" element={<Dashboard />}/>
                <Route path="/Collaborateurs" element={<Collaborateurs />}/>
                <Route path="/Collaborateurs/CreateUser" element={<CreateUser/>}/>
                <Route path="/Collaborateurs/EditUser" element={<EditUser/>}/>
                <Route path="/Collaborateurs/ViewUser" element={<ViewUser/>} />
                <Route path="/ViewUser/SoldeUser" element={<SoldeUser/>} />
                <Route path="/ViewUser/AbsenceUser" element={<AbsenceUser/>} />
                <Route path="/ViewUser/CreateAbsence" element={<CreateAbsence/>} />
                <Route path="/AbsenceForm" element={<AbsenceForm/>} />
                <Route path="/AbsenceUser/EditAbsence" element={<EditAbsence/>} />
                <Route path="/AbsenceUser/CreateAbsence" element={<CreateAbsence/>} />
                <Route path="/SoldeForm" element={<SoldeForm/>} />
                <Route path="/SoldeUser/CreateSolde" element={<CreateSolde/>}/>
                <Route path="/SoldeUser/EditSolde" element={<EditSolde/>}/>
                <Route path="/Absences" element={<Absences/>}/>
                <Route path="/Absences/EditAbsence" element={<EditAbsence/>}/>
                <Route path="/Calendar" element={<Calendar/>}/>
            </Routes>
        </main>
      </div>
          </ThemeProvider>
      </ColorModeContext.Provider>
      </LocalizationProvider>
  )
}

export default App
