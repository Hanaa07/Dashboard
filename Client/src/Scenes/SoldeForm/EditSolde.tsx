import React, {useEffect, useState} from "react";
import SoldeForm from "../../Components/SoldeForm.tsx";
import {SoldeType} from "../../Types/SoldeType.tsx";
import {Box} from "@mui/material";
import Header from "../../Components/Header.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {HttpClient} from "../../utils/request.ts";
import {useCookies} from "react-cookie";
import {UserType} from "../../Types/UserType.tsx";


const EditSolde = () => {
    const [solde, setSolde] = useState<SoldeType>(null)
    const { soldeId } = useParams();
    const {userId} = useParams()
    const [cookies] = useCookies([]);
    const navigate = useNavigate();
    const [user, setUser] = useState<UserType>(null);
    const [isConnected, setIsConnected] = useState(false);

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

    const fetchData = async () => {
        const jwt = cookies.jwt ? cookies.jwt : '';
        const res =  await HttpClient.get('/solde/'+ soldeId,  {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        });
        const receivedData = res.data;
        setIsConnected(receivedData.isAuthorised);
        if (receivedData.success === true) {
            setSolde(receivedData.data);
        }
    }

    useEffect(() => {
        fetchData().catch(e => console.log(e))
    }, [soldeId])

    const handleSubmit = (values: SoldeType) => {
        const jwt = cookies.jwt ? cookies.jwt : '';

        HttpClient.put('/solde/'+ soldeId +'/edit', values, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => {
            let receivedData = res.data;
            setIsConnected(receivedData.isAuthorised);
            if (receivedData.success === true) {
                return navigate(-1)
            }
        });
    };

    return (
        <Box m="20px">
            <Header title="MODIFICATION DU SOLDE" subtitle={`Modification du solde de ${user?.firstName} ${user?.lastName}`} />
            {(isConnected && solde) ? <SoldeForm initialValues={solde} onSubmit={handleSubmit}/> : <></>}

        </Box>
    );
}

export default EditSolde;