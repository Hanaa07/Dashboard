import { Box, Typography, Button, useTheme, Stack, ButtonGroup} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {Link, useNavigate, useParams} from "react-router-dom";
import { tokens } from "../../Theme.tsx";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Header from "../../Components/Header.tsx";
import React, {useEffect, useState} from "react";
import {HttpClient} from "../../utils/request.ts";
import dayjs from "dayjs";
import {useCookies} from "react-cookie";



const Collaborateurs = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [users, setUsers] = useState([])
    const navigate = useNavigate();
    const [cookies] = useCookies([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const jwt = cookies.jwt ? cookies.jwt : '';
        HttpClient.get("/user/", {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).then(res => {
            let receivedData = res.data;
            console.log(receivedData)
            setIsConnected(receivedData.isAuthorised);

            if (receivedData.success === true) {
                setUsers(receivedData.data);
            }
        });
    }, []);

    const columns = [
        { field: "lastName",
            headerName: "Nom",
            flex: 1,
            cellClassName: "name-column--cell"
        },
        { field: "firstName",
            headerName: "Prénom",
            flex: 1,
            cellClassName: "name-column--cell"
        },
        { field: "joinedIn",
            headerName: "Date d'entrée",
            flex: 1,
            renderCell: ({row}) => (
                dayjs(row.joinedIn).format('DD/MM/YYYY') )},
        {
            field: "statut",
            headerName: "Statut",
            flex: 1,
            renderCell: ({ row: { statut } }) => {
                return (
                    <Box
                        width="40%"
                        m="0"
                        p="5px"
                        display="flex"
                        justifyContent="space-between"
                        borderRadius="4px"
                    >
                        <Typography color={colors.gray[100]} sx={{ ml: "5px" }}>
                            {statut}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            flex: 1,
            renderCell: ({row}) => (
                <Stack spacing={2} direction="row">
                    <ButtonGroup variant="text" disableElevation size="small">
                        <Link to={"/user/"+ row._id} style={{textDecoration: "none",color: colors.gray[100]}}>
                            <Button sx={{ color: colors.gray[100] }}>
                                <VisibilityOutlinedIcon />
                            </Button>
                        </Link>
                        {
                            isConnected ? <>
                                <Link to={"/user/edit/"+ row._id} style={{textDecoration: "none",color: colors.gray[100]}}>
                                    <Button sx={{ color: colors.gray[100] }}>
                                        <EditOutlinedIcon />
                                    </Button>
                                </Link>
                                <Button sx={{ color: colors.gray[100] }} onClick={()=> {
                                    HttpClient.get('/user/delete/'+ row._id).then((res)=> {
                                        navigate('/collaborateurs')
                                    });
                                }}>
                                    <DeleteOutlineOutlinedIcon/>
                                </Button>
                            </> : <></>
                        }
                    </ButtonGroup>
                </Stack>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Header title="COLLABORATEURS" subtitle="Managing the Team Members" />
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
                {users && <DataGrid columns={columns} rows={users} slots={{toolbar: GridToolbar}} getRowId={(row) => row._id}/>}
            </Box>
            {
                isConnected ? <Box m="50px 0 0 0" display="flex" justifyContent="flex-end" alignItems="flex-end">
                    <Link to="/user/new">
                        <Button
                            variant="contained"
                            size="medium"
                            color = "secondary"
                            sx={{ backgroundColor: colors.greenAccent[700], color: colors.gray[100] }}
                            startIcon={<PersonAddAlt1OutlinedIcon/>}
                            disableElevation
                        >
                            <Typography variant="body2">Ajouter un collaborateur</Typography>
                        </Button>
                    </Link>
                </Box> : <></>
            }
        </Box>
    );
};

export default Collaborateurs;
