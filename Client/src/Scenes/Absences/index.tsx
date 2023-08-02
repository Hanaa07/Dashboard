import {Box, Button, useTheme, Stack, ButtonGroup} from "@mui/material";
import {DataGrid, frFR, GridToolbar} from "@mui/x-data-grid";
import {tokens} from "../../Theme.tsx";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Header from "../../Components/Header.tsx";
import React, {useEffect, useState} from "react";
import {HttpClient} from "../../utils/request.ts";
import {Link, useParams} from 'react-router-dom'
import dayjs from "dayjs";
import {useCookies} from "react-cookie";
import {UserType} from "../../Types/UserType.tsx";
import dayjsBusinessDays from "dayjs-business-days2";


const Absences = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [absences, setAbsences] = useState([]);
    const [cookies] = useCookies([]);
    const [user, setUser] = useState<UserType>(null);
    const [isConnected, setIsConnected] = useState(false);
    const {userId} = useParams();
    dayjs.extend(dayjsBusinessDays);

    useEffect(() => {
        const jwt = cookies.jwt ? cookies.jwt : '';
        HttpClient.get("/user/"+ userId,{
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).then(res => {
            let receivedData = res.data;
            setIsConnected(receivedData.isAuthorised);

            if (receivedData.success === true) {
                setUser(receivedData.data);
            }
        });
    }, [userId]);

    useEffect(() => {
        const jwt = cookies.jwt ? cookies.jwt : '';
        HttpClient.get("/absence/",{
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).then(res => {
            let receivedData = res.data;
            setIsConnected(receivedData.isAuthorised);

            console.log(receivedData)

            if (receivedData.success === true) {
                setAbsences(receivedData.data);
            }
        });
    }, []);


    const columns: any = [
        {
            field: "FullName",
            valueGetter: (params) => {
                return `${params.row.solde.user.lastName || ' - '} ${params.row.solde.user.firstName || ' - '}`;
            }, headerName: "Nom Complet", flex: 1, cellClassName: "name-column--cell"
        },
        {field: "absenceStartedAt", headerName: "Date Début", flex: 1,
            renderCell: ({row}) => (
                dayjs(row.absenceStartedAt).format('DD/MM/YYYY') )},
        {field: "absenceEndedAt", headerName: "Date Fin", flex: 1,
            renderCell: ({row}) => (
                dayjs(row.absenceEndedAt).format('DD/MM/YYYY') )},
        {field: "days", headerName: "Nombre de jours d'absences", flex: 1},
        {
            field: "solde",
            valueGetter: (params) => {
                return `${params.row.solde.remainingDays}`;
            },
            headerName: "Soldes",
            flex: 1
        },
    ];

    if(isConnected){
        columns.push(
            {
                field: "actions",
                headerName: "Actions",
                sortable: false,
                flex: 1,
                renderCell: ({ row }) => (
                    <Stack spacing={2} direction="row">
                        <ButtonGroup variant= "text" disableElevation size="small">
                            <Link to={"/user/"+row.solde.user._id+"/absence/"+ row._id+ "/edit/" } style={{textDecoration: "none",color: colors.gray[100]}}>
                                <Button sx={{color: colors.gray[100]}}>
                                    <EditOutlinedIcon/>
                                </Button>
                            </Link>
                            <Button sx={{color: colors.gray[100]}}>
                                <DeleteOutlineOutlinedIcon onClick={()=> {
                                    const jwt = cookies.jwt ? cookies.jwt : '';
                                    HttpClient.get('/absence/delete/'+ row._id, {
                                        headers: {
                                            'Authorization': 'Bearer ' + jwt
                                        }
                                    }).then((res)=> {
                                        window.location.reload()
                                    });
                                }}/>
                            </Button>
                        </ButtonGroup>
                    </Stack>
                )
            }
        )
    }

    return (
        <Box m="20px">
            <Header title="ABSENCES" subtitle="Gestion des absences des membres de l'équipe"/>
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
                {absences && <DataGrid columns={columns} rows={absences} localeText={frFR.components.MuiDataGrid.defaultProps.localeText} slots={{toolbar: GridToolbar}} getRowId={(row) => row._id}/>}
            </Box>
        </Box>
    )
}

export default Absences;