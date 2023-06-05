import { Box, Typography, Button, useTheme, Stack, ButtonGroup, Menu, MenuItem } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link, Path } from "react-router-dom";
import { tokens } from "../../Theme.tsx";
import { mockDataTeam } from "../../data/mockData.tsx";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Header from "../../Components/Header.tsx";
import React, { useState } from "react";

interface CollabItemProps {
    title: string;
    to: string | Partial<Path>;
    icon: any;
    selected: string;
    setSelected: (value: (((prevState: string) => string) | string)) => void;
}

const CollabItem = ({ title, to, icon, selected, setSelected }: CollabItemProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            sx={{
                color: colors.gray[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Link to={to}>
                <Typography>{title}</Typography>
            </Link>
        </MenuItem>
    );
};

const Collaborateurs = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState<string>("Collaborateurs");
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement | undefined>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "last_name", headerName: "Nom", flex: 1, cellClassName: "name-column--cell" },
        { field: "first_name", headerName: "Prénom", flex: 1, cellClassName: "name-column--cell" },
        { field: "start_date", headerName: "Date d'entrée", flex: 1 },
        { field: "balance", headerName: "Solde", flex: 1 },
        {
            field: "access",
            headerName: "Statut",
            flex: 1,
            renderCell: ({ row: { access } }) => {
                return (
                    <Box
                        width="60%"
                        m="0"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            access === "admin" ? colors.blueAccent[600] : colors.blueAccent[700]
                        }
                        borderRadius="4px"
                    >
                        {access === "Admin" && <AdminPanelSettingsOutlinedIcon />}
                        {access !== "Admin" && <LockOpenOutlinedIcon />}
                        <Typography color={colors.gray[100]} sx={{ ml: "5px" }}>
                            {access}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: () => (
                <Stack spacing={2} direction="row">
                    <ButtonGroup variant="text" disableElevation size="small">
                        <Button sx={{ color: colors.gray[100] }}>
                            <VisibilityOutlinedIcon />
                        </Button>
                        <Button sx={{ color: colors.gray[100] }}>
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
                }}
            >
                <DataGrid columns={columns} rows={mockDataTeam} />
            </Box>
            <Box m="50px 0 0 0" display="flex" justifyContent="flex-end" alignItems="flex-end">
                <Button
                    variant="contained"
                    size="small"
                    sx={{ backgroundColor: colors.greenAccent[700], color: colors.gray[100] }}
                    onClick={handleMenuOpen}
                    startIcon={<PersonAddAlt1OutlinedIcon />}
                    disableElevation
                >
                    <CollabItem title="Ajouter un collaborateur" to="/UserForm" icon={<PersonAddAlt1OutlinedIcon />} selected={selected} setSelected={setSelected} />
                </Button>
                <Menu
                    anchorEl={menuAnchor}
                    open={Boolean(menuAnchor)}
                    onClose={handleMenuClose}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    <CollabItem title="Ajouter un collaborateur" to="/UserForm" icon={<PersonAddAlt1OutlinedIcon />} selected={selected} setSelected={setSelected} />
                </Menu>
            </Box>
        </Box>
    );
};

export default Collaborateurs;
