import {Box} from "@mui/material";
import Header from "../../Components/Header.tsx";
import {AbsenceType} from "../../Types/AbsenceType.tsx";
import React, {useEffect, useState} from "react";
import AbsenceForm from "../../Components/AbsenceForm.tsx";
import {HttpClient} from "../../utils/request.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import {UserType} from "../../Types/UserType.tsx";
import {SoldeType} from "../../Types/SoldeType.tsx";

const EditAbsence = () => {
    const [absence, setAbsence] = useState<AbsenceType>(null);
    const {absenceId} = useParams();
    const {userId} = useParams()
    const [lastSolde, setLastSolde] = useState<SoldeType>(null);
    const [cookies] = useCookies([]);
    const navigate = useNavigate();
    const [isConnected, setIsConnected] = useState(false);
    const [user, setUser] = useState<UserType>(null);

    useEffect(() => {
        const jwt = cookies.jwt ? cookies.jwt : '';
        HttpClient.get("/user/"+ userId, {
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

    useEffect(() => {
        const jwt = cookies.jwt ? cookies.jwt : '';
        HttpClient.get('/user/'+userId+'/lastSolde', {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => {
            let receivedData = res.data;
            setIsConnected(receivedData.isAuthorised);
            if (receivedData.success) {
                setLastSolde(receivedData.data)
            }
        })
    }, [])
    const fetchData = async () => {
        const jwt = cookies.jwt ? cookies.jwt : '';
        const res =  await HttpClient.get('/absence/' + absenceId, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        });
        const receivedData = res.data;
        setIsConnected(receivedData.isAuthorised);

        if (receivedData.success === true) {
            setAbsence(receivedData.data);
        }
    }

    useEffect(() => {
        fetchData().catch(e => console.log(e))
    }, [absenceId])

    const handleSubmit = (values: AbsenceType) => {
        const jwt = cookies.jwt ? cookies.jwt : '';
        HttpClient.put("/absence/"+ absenceId +"/edit", values, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => {
            let receivedData = res.data;
            setIsConnected(receivedData.isAuthorised);
            if (receivedData.success === true) {
                return navigate("/absences")
            }
        });
    };

    return (
        <Box m="20px">
            <Header title="MODIFICATION D'ABSENCE" subtitle={`Modification d'absence pour ${user?.firstName} ${user?.lastName}`}/>
            {(isConnected && absence) ? <AbsenceForm initialValues={absence} onSubmit={handleSubmit}/> : <></>}
        </Box>
    );
}

export default EditAbsence;