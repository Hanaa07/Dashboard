import {Box} from "@mui/material";
import Header from "../../Components/Header.tsx";
//import {useNavigate} from "react-router-dom";
import {AbsenceType} from "../../Types/AbsenceType.tsx";
import React from "react";
import {mockAbsences} from "../../data/mockData.tsx";
import AbsenceForm from "../../Components/AbsenceForm.tsx";

const CreateAbsence = () => {
    const currentAbsence = mockAbsences.find((data) => data.id === 4)

    const initialValues: AbsenceType = {
        first_name: currentAbsence.first_name,
        last_name: currentAbsence.last_name,
        start_date: "",
        end_date: "",
        days: undefined,
    }
    const handleSubmit = (values: AbsenceType) => {

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
            <Header title="AJOUT ABSENCE" subtitle="Ajout d'une nouvelle absence pour ..." />
            <AbsenceForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
        </Box>
    );
}

export default CreateAbsence;



