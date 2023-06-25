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

const EditUser = () => {
    const [user, setUser] = useState<UserType>(null)
    const { userId } = useParams();
    const navigate = useNavigate();

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

        console.log("value finale", values)

        HttpClient.put('/user/'+ userId, values).then((res) => {
            let receivedData = res.data;
            if (receivedData.success === true) {
                return navigate('/collaborateurs')
            }
        });
    };

    return(
        <Box m="20px">
            <Header title="MODIFICATION D'UN UTILISATEUR" subtitle="Modification des informations personnelles de " />
            {user ? <UserForm initialValues={user} onSubmit={handleSubmit}/> : <></>}
        </Box>
    )
}

export default EditUser;