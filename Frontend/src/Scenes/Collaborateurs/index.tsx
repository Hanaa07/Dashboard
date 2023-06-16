import { Box, Typography, Button, useTheme, Stack, ButtonGroup, Menu, MenuItem } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {generatePath, Link, useNavigate, useParams} from "react-router-dom";
import { tokens } from "../../Theme.tsx";
import { mockDataContacts} from "../../data/mockData.tsx";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Header from "../../Components/Header.tsx";
import React, { useState } from "react";
import {FormItemProps} from "../../Types/FormItemProps.tsx";


const CollabItem = ({ title, to, selected, setSelected }: FormItemProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Link to={to} style={{textDecoration:"none", color: colors.gray[100]}}>
            <Typography variant="body2">{title}</Typography>
        </Link>
    );
};

const Collaborateurs = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState<string>("Collaborateurs");

    const handleClick = (event,to: string) => {
        event.preventDefault();
        window.location.href = to;

    }

    const handleDelete = () => {

    }

    const columns = [
        { field: "id", headerName: "ID", sortable: false },
        { field: "nom", headerName: "Nom", flex: 1, cellClassName: "name-column--cell" },
        { field: "prenom", headerName: "Prénom", flex: 1, cellClassName: "name-column--cell" },
        { field: "start_date", headerName: "Date d'entrée", flex: 1 },
        { field: "balance", headerName: "Solde", flex: 1 },
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
                        {statut === "admin" && <AdminPanelSettingsOutlinedIcon />}
                        {statut !== "admin" && <LockOpenOutlinedIcon />}
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
            renderCell: () => (
                <Stack spacing={2} direction="row">
                    <ButtonGroup variant="text" disableElevation size="small">
                            <Button sx={{ color: colors.gray[100] }} onClick={(event) => handleClick(event,"/Collaborateurs/ViewUser")}>
                                <VisibilityOutlinedIcon />
                            </Button>
                        <Button sx={{ color: colors.gray[100] }} onClick={(event) => handleClick(event,"/Collaborateurs/EditUser")}>
                            <EditOutlinedIcon />
                        </Button>
                        <Button sx={{ color: colors.gray[100] }}>
                            <DeleteOutlineOutlinedIcon />
                        </Button>
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
                        backgroundColor: colors.primary[400],
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
                <DataGrid columns={columns} rows={mockDataContacts} slots={{toolbar: GridToolbar}}/>
            </Box>
            <Box m="50px 0 0 0" display="flex" justifyContent="flex-end" alignItems="flex-end">
                <Link to="/Collaborateurs/CreateUser">
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
            </Box>
        </Box>
    );
};

export default Collaborateurs;
