import React from "react";
import SoldeForm from "../../Components/SoldeForm.tsx";
//import { useNavigate } from "react-router-dom";
import {SoldeType} from "../../Types/SoldeType.tsx";
import {Box} from "@mui/material";
import Header from "../../Components/Header.tsx";
import {useParams} from "react-router-dom";
import {mockSolde} from "../../data/mockData.tsx";

//const { userId } = useParams();

const EditSolde = () => {
    const currentSolde = mockSolde.find((data) => data.id === 1);

    const initialValues: SoldeType = {
        id: currentSolde.id,
        start_date: currentSolde.start_date,
        end_date: currentSolde.end_date,
        balance: currentSolde.balance,
        days: currentSolde.days,
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
            <Header title="MODIFICATION DU SOLDE" subtitle="Modification du solde de ..." />
            <SoldeForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
        </Box>
    );
}

export default EditSolde