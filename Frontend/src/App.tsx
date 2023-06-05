import {ColorModeContext, useMode} from "./Theme.tsx";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {Routes, Route, Link} from "react-router-dom";
import { LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Topbar from "./Scenes/Global/Topbar.tsx";
import Dashboard from "./Scenes/Dashboard";
import Sidebar from "./Scenes/Global/Sidebar.tsx";
import Collaborateurs from "./Scenes/Collaborateurs";
import {useState} from "react";
import Absences from "./Scenes/Absences"
import UserForm from "./Scenes/UserForm";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState<boolean>(true);

  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
              <CssBaseline />
      <div className="app">
          <Sidebar isSidebar={isSidebar}/>
        <main className="content">
            <Topbar setIsSidebar={setIsSidebar}/>
            <Routes>
                <Route path="/" element={<Dashboard />}/>
                <Route path="/Collaborateurs" element={<Collaborateurs />}/>
                <Route path="/Absences" element={<Absences/>}/>
                <Route path="/UserForm" element={<UserForm/>} />
            </Routes>
        </main>
      </div>
          </ThemeProvider>
      </ColorModeContext.Provider>
      </LocalizationProvider>
  )
}

export default App
