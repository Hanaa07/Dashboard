import { Box, Typography, Button, useTheme, Stack, ButtonGroup} from "@mui/material";
import {DataGrid, frFR, GridToolbar} from "@mui/x-data-grid";
import {Link, useNavigate, useParams} from "react-router-dom";
import { tokens } from "../../Theme.tsx";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Header from "../../Components/Header.tsx";
import React, {useEffect, useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import {HttpClient} from "../../utils/request.ts";
import dayjs from "dayjs";
import {useCookies} from "react-cookie";

const SoldeUser = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [cookies] = useCookies([]);
    const [soldes, setSoldes] = useState([]);
    const { soldeId } = useParams();
    const { userId}= useParams();
    const [userName, setUserName] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const jwt = cookies.jwt ? cookies.jwt : '';
        HttpClient.get("/user/" + userId + "/soldes",{
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).then(res => {
            let receivedData = res.data;
            console.log(receivedData)
            console.log(soldeId)
            if (receivedData.success === true) {
                setSoldes(receivedData.data);

                for (const data of receivedData.data) {
                    if (data.user.firstName) {
                        setUserName(data.user.firstName + ' ' + data.user.lastName);
                        break;
                    }
                }
            }
        });
    }, []);

    const columns = [
        { field: "balanceStartedAt", headerName: "Date Début", flex: 1, cellClassName: "name-column--cell" ,
            renderCell: ({row}) => (
                dayjs(row.balanceStartedAt).format('DD/MM/YYYY') )},
        { field: "balanceEndedAt", headerName: "Date Fin", flex: 1, cellClassName: "name-column--cell",
            renderCell: ({row}) => (
                dayjs(row.balanceEndedAt).format('DD/MM/YYYY') )},
        { field: "initialDays", headerName: "Solde", flex: 1 },
        { field: "remainingDays", headerName: "jours restants du solde", flex: 1 },
            {
                field: "actions",
                sortable: false,
                headerName: "Actions",
                flex: 1,
                renderCell: ({row}) => (
                    <Stack spacing={2} direction="row">
                        <ButtonGroup variant="text" disableElevation size="small">
                            <Link to={"/user/"+userId+"/solde/"+ row._id +"/edit"} style={{textDecoration: "none",color: colors.gray[100]}}>
                                <Button sx={{ color: colors.gray[100] }}>
                                    <EditOutlinedIcon />
                                </Button>
                            </Link>
                            <Button sx={{ color: colors.gray[100] }}>
                                <DeleteOutlineOutlinedIcon onClick={()=> {
                                    const jwt = cookies.jwt ? cookies.jwt : '';
                                    HttpClient.get('/solde/'+ row._id +'/delete',{
                                        headers: {
                                            'Authorization': 'Bearer ' + jwt
                                        }
                                    }).then((res)=> {
                                        return window.location.reload()
                                    });
                                }}/>
                            </Button>
                        </ButtonGroup>
                    </Stack>
                )
            }];


    return (
        <Box m="20px">
            <Header title="SOLDES" subtitle={`Liste des soldes de ${userName}`}  />
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
                {soldes && <DataGrid
                    columns={columns}
                    rows={soldes}
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    initialState={{pagination: { paginationModel: { pageSize: 25 } }}}
                    slots={{toolbar: GridToolbar}}
                    getRowId={(row) => row._id}/>}
            </Box>

               <Box m="50px 0 0 0" display="flex" justifyContent="flex-end" alignItems="flex-end">
                    <Link to={"/user/"+ userId + "/solde/new"}>
                        <Button
                            variant="contained"
                            size="medium"
                            color="secondary"
                            sx={{ backgroundColor: colors.greenAccent[700], color: colors.gray[100] }}
                            startIcon={<AddIcon/>}
                            disableElevation
                        >
                            <Typography variant="body2">Ajouter un solde</Typography>
                        </Button>
                    </Link>
                </Box>

        </Box>
    );
};

export default SoldeUser;
