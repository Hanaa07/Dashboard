import React from "react";
import UserForm from "../../Components/UserForm";
import {UserType} from "../../Types/UserType.tsx";
import {Box} from "@mui/material";
import Header from "../../Components/Header.tsx";
import {HttpClient} from "../../utils/request.ts";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";


const CreateUser = () => {
    const navigate = useNavigate()
    const [cookies] = useCookies([]);
    const initialValues: UserType = {
        adresse: "",
        email: "",
        lastName: "",
        firstName: "",
        phone: "",
        statut: "",
        joinedIn: "",
        exp_pro: "",
        exp_mit: "",
        birth: ""
    }


    const handleSubmit = (values: UserType) => {
        const jwt = cookies.jwt ? cookies.jwt : '';
        values.password = "12345";
        HttpClient.post('/user/new', values, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).then((res) => {
            if (res.data.success === true) {
                return navigate('/collaborateurs')
            }
        });

    };

    return (
        <Box m="20px">
            <Header title="AJOUT UTILISATEUR" subtitle="Ajouter un nouvel utilisateur" />
            <UserForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
        </Box>
    );
};

export default CreateUser;
