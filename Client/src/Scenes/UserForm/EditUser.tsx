import {UserType} from "../../Types/UserType.tsx";
import {mockDataContacts} from "../../data/mockData.tsx";
import UserForm from "../../Components/UserForm.tsx";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../Components/Header.tsx";
import {Box} from "@mui/material";
import {HttpClient} from "../../utils/request.ts";
import {AbsenceType} from "../../Types/AbsenceType.tsx";
import AbsenceForm from "../../Components/AbsenceForm.tsx";
import {useCookies} from "react-cookie";

const EditUser = () => {
    const [user, setUser] = useState<UserType>(null)
    const { userId } = useParams();
    const [cookies] = useCookies([]);
    const navigate = useNavigate();

    useEffect(() => {
        HttpClient.get("/user/"+ userId).then(res => {
            let receivedData = res.data;

            if (receivedData.success === true) {
                setUser(receivedData.data);
            }
        });
    }, [userId]);

    const fetchData = async () => {
        const res = await HttpClient.get('/user/' + userId);
        const receivedData = res.data;

        if (receivedData.success === true) {
            setUser(receivedData.data);
        }
    }
    useEffect(() => {
        fetchData().catch(e => console.log(e))
    }, [userId])

    const handleSubmit = (values: AbsenceType) => {
        const jwt = cookies.jwt ? cookies.jwt : '';
        console.log("value finale", values)

        HttpClient.put('/user/'+ userId, values, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => {
            let receivedData = res.data;
            if (receivedData.success === true) {
                return navigate('/collaborateurs')
            }
        });
    };

    return(
        <Box m="20px">
            <Header title="MODIFICATION D'UN UTILISATEUR" subtitle={`Modification des informations personnelles de ${user.firstName} ${user.lastName}`} />
            {user ? <UserForm initialValues={user} onSubmit={handleSubmit}/> : <></>}
        </Box>
    )
}

export default EditUser;