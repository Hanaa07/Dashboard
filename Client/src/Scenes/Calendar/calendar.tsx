import {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import {formatDate} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import Header from "../../Components/Header.tsx";
import {tokens} from "../../Theme.tsx";


const Calendar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isConnected, setIsConnected] = useState(false);
    const [currentEvents, setCurrentEvents] = useState<[]>(() => {
        const localValue = localStorage.getItem("DATES")
        if (localValue == null) return []

        return JSON.parse(localValue)
    })

    useEffect(() => {
        const jsonres  = localStorage.getItem("DATES") ?? null
        let res = []
        if (jsonres)
         res = JSON.parse(jsonres)
        setCurrentEvents(res)
    },[])

    const setToLocaleStorage = (data) => {
        const jsonres  = localStorage.getItem("DATES") ?? null
        let res = []
        if (jsonres)
            res = JSON.parse(jsonres)
        res.push(data)
        localStorage.setItem("DATES", JSON.stringify(res))
    }
    const handleDateClick = (selected) => {
        const title = prompt("Veuillez donner un titre à votre événement");
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();

        if (title) {
            const data = {
                id : crypto.randomUUID(),
                title,
                start: new Date(selected.startStr),
                end: new Date(selected.endStr),
                allDay: selected.allDay,
            }
            calendarApi.addEvent(data)
            setToLocaleStorage(data)
        }
    };

    const handleEventClick = (selected) => {
        const action = prompt(
            `Que souhaitez-vous faire à l'événement '${selected.event.title}'? Entrer 'm' pour modifier le titre ou 's' pour supprimer l'événement.`
        );

        if (action === "m") {
            const newTitle = prompt(
                "Veuillez donner un nouveau titre à votre événement",
                selected.event.title
            );

            if (newTitle) {
                selected.event.setProp("title", newTitle);
                setToLocaleStorage(newTitle)
            }
        } else if (action === "s") {
            if (
                window.confirm(
                    `Etes-vous sur(e) de vouloir supprimer l'événement ${selected.event.title}'?`
                )
            ) {
                console.log(selected)
                const result = currentEvents.filter(item => item.id != selected.event.id)
                console.log(result)
                localStorage.setItem("DATES",JSON.stringify(result))
                setCurrentEvents(result)
            }
        }
    };


    return (
        <Box m="20px">
            <Header title="Calendrier" subtitle="Calendrier interactif" />

            <Box display="flex" justifyContent="space-between">
                {/* CALENDAR SIDEBAR */}
                <Box
                    flex="1 1 20%"
                    backgroundColor={colors.primary[400]}
                    p="15px"
                    borderRadius="15px"
                >
                    <Typography variant="h5">Evénements</Typography>
                    <List>
                        {currentEvents.map((event) => (
                            <ListItem
                                key={event.id}
                                sx={{
                                    backgroundColor: colors.greenAccent[400],
                                    margin: "10px 0",
                                    borderRadius: "10px",
                                }}
                            >
                                <ListItemText
                                    primary={event.title}
                                    secondary={
                                        <Typography>
                                            {formatDate(event.start, {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* CALENDAR */}
                <Box flex="1 1 100%" ml="15px" sx={{
                    backgroundColor: `${colors.primary[700]} transparent`,
                    backdropFilter: "blur(20px)",
                    borderRadius: "15px",
                    border: `1px solid ${colors.primary[700]}`,
                }}><Box p={2}>
                    <FullCalendar
                        height="75vh"
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                            listPlugin
                        ]}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                        }}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        select={handleDateClick}
                        eventClick={handleEventClick}
                        events={currentEvents}
                    />
                </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Calendar;