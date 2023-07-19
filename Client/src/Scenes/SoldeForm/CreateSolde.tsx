import React, {useEffect, useState} from "react";
import SoldeForm from "../../Components/SoldeForm.tsx";
import {SoldeType} from "../../Types/SoldeType.tsx";
import {Box} from "@mui/material";
import Header from "../../Components/Header.tsx";
import {HttpClient} from "../../utils/request.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import {UserType} from "../../Types/UserType.tsx";


const CreateSolde = () => {
    const {userId} = useParams()
    const [cookies] = useCookies([]);
    const [user, setUser] = useState<UserType>(null);
    const [isConnected, setIsConnected] = useState(false);
    const navigate = useNavigate()

    const initialValues: SoldeType = {
        balanceStartedAt: "",
        balanceEndedAt: "",
        initialDays: undefined,
        remainingDays: undefined,
    }

    useEffect(() => {
        const jwt = cookies.jwt ? cookies.jwt : '';
        HttpClient.get("/user/"+ userId,{
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).then(res => {
            let receivedData = res.data;
            setIsConnected(receivedData.isAuthorised);

            if (receivedData.success === true) {
                setUser(receivedData.data);
            }
        });
    }, [userId]);

    const handleSubmit = (values: SoldeType) => {
        const jwt = cookies.jwt ? cookies.jwt : '';


        HttpClient.post('/user/' + userId + '/solde/new/', values, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => {
            return navigate("/user/"+userId+"/solde/")
        });

    };

    return (
        <Box m="20px">
            <Header title="AJOUT SOLDE" subtitle={`Ajouter un nouveau solde pour ${user?.firstName} ${user?.lastName}`} />
            <SoldeForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
        </Box>
    );
}

export default CreateSolde;