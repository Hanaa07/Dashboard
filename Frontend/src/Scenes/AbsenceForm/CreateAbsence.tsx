import {Box} from "@mui/material";
import Header from "../../Components/Header.tsx";
import {AbsenceType} from "../../Types/AbsenceType.tsx";
import React, {useEffect, useState} from "react";
import AbsenceForm from "../../Components/AbsenceForm.tsx";
import {HttpClient} from "../../utils/request.ts";
import {useNavigate, useParams} from "react-router-dom";
import {SoldeType} from "../../Types/SoldeType.tsx";

const CreateAbsence = () => {
    const [absence, setAbsence] = useState<AbsenceType>(null);
    const navigate = useNavigate();
    const initialValues: AbsenceType = {
        absenceStartedAt: "",
        absenceEndedAt: "",
        days: undefined,
    }
    const handleSubmit = (values: AbsenceType) => {


        HttpClient.post('/absence/new', values).then((res) => {
            let receivedData = res.data;
            if (receivedData.success === true) {
                return navigate('/absences')
            }
        });
    };

    return (
        <Box m="20px">
            <Header title="AJOUT ABSENCE" subtitle={`Ajout d'une nouvelle absence pour `} />
            <AbsenceForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
        </Box>
    );
}

export default CreateAbsence;



