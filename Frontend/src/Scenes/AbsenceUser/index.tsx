import { Box, Typography, Button, useTheme, Stack, ButtonGroup, MenuItem } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link, Path } from "react-router-dom";
import { tokens } from "../../Theme.tsx";
import {mockSolde} from "../../data/mockData.tsx";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Header from "../../Components/Header.tsx";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

const AbsenceUser = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState<string>("SoldeUser");
    const handleClick = (event,to: string) => {
        event.preventDefault();
        window.location.href = to;
    }

    const columns = [
        { field: "start_date", headerName: "Date Début", flex: 1, cellClassName: "name-column--cell" },
        { field: "end_date", headerName: "Date Fin", flex: 1, cellClassName: "name-column--cell" },
        { field: "balance", headerName: "Solde", flex: 1 },
        { field: "days", headerName: "jours d'absence", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: () => (
                <Stack spacing={2} direction="row">
                    <ButtonGroup variant="text" disableElevation size="small">
                        <Button sx={{ color: colors.gray[100] }} onClick={(event)=> handleClick(event,"/AbsenceUser/EditAbsence")}>
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
            <Header title="ABSENCES" subtitle="Liste des absence de Jane doe" />
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
                <DataGrid columns={columns} rows={mockSolde} slots={{toolbar: GridToolbar}}/>
            </Box>
            <Box m="50px 0 0 0" display="flex" justifyContent="flex-end" alignItems="flex-end">
                <Link to="/AbsenceUser/CreateAbsence" style={{textDecoration:"none", color: colors.gray[100]}}>
                <Button
                    variant="contained"
                    size="medium"
                    color="secondary"
                    sx={{ backgroundColor: colors.greenAccent[700], color: colors.gray[100] }}
                    startIcon={<AddIcon/>}
                    disableElevation
                >
                    <Typography variant="body2">Ajouter</Typography>
                </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default AbsenceUser;
