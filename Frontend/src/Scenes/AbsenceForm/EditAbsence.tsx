import {Box} from "@mui/material";
import Header from "../../Components/Header.tsx";
//import {useNavigate} from "react-router-dom";
import {AbsenceType} from "../../Types/AbsenceType.tsx";
import React, {useEffect, useState} from "react";
import {mockAbsences} from "../../data/mockData.tsx";
import AbsenceForm from "../../Components/AbsenceForm.tsx";
import {HttpClient} from "../../utils/request.ts";
import {useNavigate, useParams} from "react-router-dom";

const EditAbsence = () => {
    const [absence, setAbsence] = useState<AbsenceType>(null);
    const {absenceId} = useParams();
    const navigate = useNavigate();

    const fetchData = async () => {
        const res =  await HttpClient.get('/absence/' + absenceId);
        const receivedData = res.data;

        if (receivedData.success === true) {
            setAbsence(receivedData.data);
        }
    }

    useEffect(() => {
        fetchData().catch(e => console.log(e))
    }, [absenceId])

    const handleSubmit = (values: AbsenceType) => {

        console.log("value finale", values)

        HttpClient.put('/absence/'+ absenceId, values).then((res) => {
            let receivedData = res.data;
            if (receivedData.success === true) {
                return navigate('/absences')
            }
        });
    };

    return (
        <Box m="20px">
            <Header title="MODIFICATION D'ABSENCE" subtitle={`Modification d'absence pour `}/>
            {absence ? <AbsenceForm initialValues={absence} onSubmit={handleSubmit}/> : <></>}
        </Box>
    );
}

export default EditAbsence;