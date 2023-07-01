import { Box, Typography, Button, useTheme, Stack, ButtonGroup} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {Link, useNavigate, useParams} from "react-router-dom";
import { tokens } from "../../Theme.tsx";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Header from "../../Components/Header.tsx";
import React, {useEffect, useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import {HttpClient} from "../../utils/request.ts";
import dayjs from "dayjs";

const AbsenceUser = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [absences, setAbsences] = useState([])
    const { userId } = useParams();
    const [userName, setUserName] = useState('');
    const navigate = useNavigate()


    useEffect(() => {
        console.log('init')
        HttpClient.get(`/user/${userId}/absences`).then(res => {
            console.log(res)
            let receivedData = res.data;

            setAbsences(receivedData.data);

            for (const data of receivedData.data) {
                if (data.solde.user.firstName) {
                    setUserName(data.solde.user.firstName + ' ' + data.solde.user.lastName);
                    break;
                }
            }
        });
    }, []);


    const columns = [
        { field: "absenceStartedAt", headerName: "Date Début", flex: 1, cellClassName: "name-column--cell",
            renderCell: ({row}) => (
                dayjs(row.absenceStartedAt).format('DD/MM/YYYY') )},
        { field: "absenceEndedAt", headerName: "Date Fin", flex: 1, cellClassName: "name-column--cell",
            renderCell: ({row}) => (
                dayjs(row.absenceEndedAt).format('DD/MM/YYYY') )},
        { field: "days", headerName: "jours d'absence", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: ({row}) => (
                <Stack spacing={2} direction="row">
                    <ButtonGroup variant="text" disableElevation size="small">
                        <Link to={"/absence/edit/"+ row._id} style={{textDecoration: "none",color: colors.gray[100]}}>
                            <Button sx={{ color: colors.gray[100] }}>
                                <EditOutlinedIcon />
                            </Button>
                        </Link>
                        <Button sx={{ color: colors.gray[100] }}>
                            <DeleteOutlineOutlinedIcon onClick={()=> {
                                HttpClient.get('/absence/delete/'+ row._id).then((res)=> {
                                    window.location.reload()
                                });
                            }}/>
                        </Button>
                    </ButtonGroup>
                </Stack>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Header title="ABSENCES" subtitle={`Liste des absence de ${userName}`} />
            <Box
                m="40px 0 0 0"
                height="58vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.greenAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: `${colors.primary[400]} transparent`,
                        backdropFilter: "blur(9px)",
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.greenAccent[700],
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
                        color: colors.gray[100]
                    }
                }}
            >
                {
                    absences ?
                        <DataGrid columns={columns} rows={absences} slots={{toolbar: GridToolbar}} getRowId={(row) => row._id}/>
                        :
                        <></>
                }
            </Box>
            <Box m="50px 0 0 0" display="flex" justifyContent="flex-end" alignItems="flex-end">
                <Link to={"/absence/user/new/" + userId} style={{textDecoration:"none", color: colors.gray[100]}}>
                <Button
                    variant="contained"
                    size="medium"
                    color="secondary"
                    sx={{ backgroundColor: colors.greenAccent[700], color: colors.gray[100] }}
                    startIcon={<AddIcon/>}
                    disableElevation
                >
                    <Typography variant="body2">Ajouter une absence</Typography>
                </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default AbsenceUser;
