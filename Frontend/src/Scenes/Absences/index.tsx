import {Box, Button, useTheme, Stack, ButtonGroup} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {tokens} from "../../Theme.tsx";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Header from "../../Components/Header.tsx";
import React, {useEffect, useState} from "react";
import {HttpClient} from "../../utils/request.ts";
import { Link } from 'react-router-dom'

const Absences = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [absences, setAbsences] = useState([]);

    useEffect(() => {
        HttpClient.get("/absence/").then(res => {
            let receivedData = res.data;

            if (receivedData.success === true) {
                setAbsences(receivedData.data);
            }
        });
    }, []);


    const columns = [
        {
            field: "FullName",
            valueGetter: (params) => {
                return `${params.row.solde.user.lastName || ' - '} ${params.row.solde.user.firstName || ' - '}`;
            }, headerName: "Nom Complet", flex: 1, cellClassName: "name-column--cell"
        },
        {field: "absenceStartedAt", headerName: "Date Début", flex: 1},
        {field: "absenceEndedAt", headerName: "Date Fin", flex: 1},
        {field: "days", headerName: "Nombre de jours d'absences", flex: 1},
        {
            field: "solde",
            valueGetter: (params) => {
                return `${params.row.solde.remainingDays}`;
            },
            headerName: "Soldes",
            flex: 1
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            flex: 1,
            renderCell: ({ row }) => (
                <Stack spacing={2} direction="row">
                    <ButtonGroup variant= "text" disableElevation size="small">
                        <Link to={"/absence/edit/" + row._id} style={{textDecoration: "none",color: colors.gray[100]}}>
                            <Button sx={{color: colors.gray[100]}}>
                                <EditOutlinedIcon/>
                            </Button>
                        </Link>
                        <Button sx={{color: colors.gray[100]}}>
                            <DeleteOutlineOutlinedIcon onClick={()=> {
                                HttpClient.get('/absence/delete/'+ row._id).then((res)=> {
                                });
                            }}/>
                        </Button>
                    </ButtonGroup>
                </Stack>
            )
        }
    ]

    return (
        <Box m="20px">
            <Header title="ABSENCES" subtitle="Managing the Attendance of Team Members"/>
            <Box m="40px 0 0 0" height="58vh" sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none"
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300]
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.greenAccent[700],
                    borderBottom: "none"
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: `${colors.primary[400]} transparent`,
                    backdropFilter: "blur(9px)",
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.greenAccent[700]
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: colors.gray[100]
                }
            }}>
                {absences && <DataGrid columns={columns} rows={absences} slots={{toolbar: GridToolbar}} getRowId={(row) => row._id}/>}
            </Box>
        </Box>
    )
}

export default Absences;