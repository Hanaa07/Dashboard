import {Box} from "@mui/material";
import Header from "../../Components/Header.tsx";
//import {useNavigate} from "react-router-dom";
import {AbsenceType} from "../../Types/AbsenceType.tsx";
import React from "react";
import {mockAbsences} from "../../data/mockData.tsx";
import AbsenceForm from "../../Components/AbsenceForm.tsx";

const EditAbsence = () => {
    const currentAbsence = mockAbsences.find((data) => data.id === 20)

    const initialValues: AbsenceType = {
        first_name: currentAbsence.first_name,
        last_name: currentAbsence.last_name,
        start_date: currentAbsence.start_date,
        end_date: currentAbsence.end_date,
        days: currentAbsence.days,
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
            <Header title="MODIFICATION D'ABSENCE" subtitle="Modification d'absence pour ..." />
            <AbsenceForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
        </Box>
    );
}

export default EditAbsence;