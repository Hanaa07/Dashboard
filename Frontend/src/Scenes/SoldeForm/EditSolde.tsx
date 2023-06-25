import React, {useEffect, useState} from "react";
import SoldeForm from "../../Components/SoldeForm.tsx";
//import { useNavigate } from "react-router-dom";
import {SoldeType} from "../../Types/SoldeType.tsx";
import {Box} from "@mui/material";
import Header from "../../Components/Header.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {mockSolde} from "../../data/mockData.tsx";
import {HttpClient} from "../../utils/request.ts";
import AbsenceForm from "../../Components/AbsenceForm.tsx";



const EditSolde = () => {
    const [solde, setSolde] = useState<SoldeType>(null)
    const { soldeId } = useParams();
    const navigate = useNavigate();

    const fetchData = async () => {
        const res =  await HttpClient.get('/solde/'+ soldeId);
        const receivedData = res.data;

        if (receivedData.success === true) {
            setSolde(receivedData.data);
        }
    }

    useEffect(() => {
        fetchData().catch(e => console.log(e))
    }, [soldeId])
    const handleSubmit = (values: SoldeType) => {

        console.log("value finale",values)


        HttpClient.put('/solde/edit/'+ soldeId, values).then((res) => {
            let receivedData = res.data;
            if (receivedData.success === true) {
                return navigate('/solde/userId')
            }

        });

    };

    return (
        <Box m="20px">
            <Header title="MODIFICATION DU SOLDE" subtitle="Modification du solde de ..." />
            {solde ? <SoldeForm initialValues={solde} onSubmit={handleSubmit}/> : <></>}

        </Box>
    );
}

export default EditSolde