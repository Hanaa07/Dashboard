import React from "react";
import UserForm from "../../Components/UserForm";
import {UserType} from "../../Types/UserType.tsx";
import {Box} from "@mui/material";
import Header from "../../Components/Header.tsx";
import {HttpClient} from "../../utils/request.ts";


const CreateUser = () => {
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


        HttpClient.post('/user/new', values).then((res) => {
            console.log(res)
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
