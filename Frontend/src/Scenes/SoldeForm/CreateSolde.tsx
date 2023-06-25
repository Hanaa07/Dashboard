import React from "react";
import SoldeForm from "../../Components/SoldeForm.tsx";
import {SoldeType} from "../../Types/SoldeType.tsx";
import {Box} from "@mui/material";
import Header from "../../Components/Header.tsx";
import {HttpClient} from "../../utils/request.ts";
import {useParams} from "react-router-dom";


const CreateSolde = () => {
    const initialValues: SoldeType = {
        balanceStartedAt: "",
        balanceEndedAt: "",
        initialDays: undefined,
        remainingDays: undefined,
    }
    const handleSubmit = (values: SoldeType) => {

        console.log("value finale",values)

        HttpClient.post('/solde/new', values).then((res) => {
            console.log(res)
        });

    };

    return (
        <Box m="20px">
            <Header title="AJOUT SOLDE" subtitle="Ajouter un nouveau solde" />
            <SoldeForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
        </Box>
    );
}

export default CreateSolde;