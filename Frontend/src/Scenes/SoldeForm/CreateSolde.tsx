import React from "react";
import SoldeForm from "../../Components/SoldeForm.tsx";
//import { useNavigate } from "react-router-dom";
import {SoldeType} from "../../Types/SoldeType.tsx";
import {Box} from "@mui/material";
import Header from "../../Components/Header.tsx";


const CreateSolde = () => {
    const initialValues: SoldeType = {
        start_date: "",
        end_date: "",
        balance: undefined,
        days: undefined,
    }
    const handleSubmit = (values: SoldeType) => {

        console.log("value finale",values)

        /*fetch("http://localhost:8000/Collaborateurs", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(values)
        })
            .then((res) => {
                alert("Saved successfully.");
                navigate("/");
            })
            .catch((err) => {
                console.log(err.message);
            });*/
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

export default CreateSolde