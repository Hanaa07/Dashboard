import React from "react";
import UserForm from "../../Components/UserForm";
//import { useNavigate } from "react-router-dom";
import {UserType} from "../../Types/UserType.tsx";
import {Box} from "@mui/material";
import Header from "../../Components/Header.tsx";

const CreateUser = () => {
    //const navigate = useNavigate();
    const initialValues: UserType = {
        adresse: "",
        adresse_mail: "",
        nom: "",
        prenom: "",
        num_tel: "",
        statut: "",
        start_date: "",
        balance: undefined,
        exp_pro: "",
        exp_mit: "",
        birth: ""
    }

    const handleSubmit = (values: UserType) => {

        console.log("value finale",values)

        /*fetch("http://localhost:8000/Collaborateurs", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(values)
        })
            .then((res) => {
                alert("Saved successfully.");
                navigate("/");
            })
            .catch((err) => {
                console.log(err.message);
            });*/
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
