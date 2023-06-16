import {UserType} from "../../Types/UserType.tsx";
import {mockDataContacts} from "../../data/mockData.tsx";
import UserForm from "../../Components/UserForm.tsx";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Header from "../../Components/Header.tsx";
import {Box} from "@mui/material";

//const { userId } = useParams();



const EditUser = () => {
    const currentUser = mockDataContacts.find((data ) => data.id === 5);

    const initialValues : UserType = {
        id: currentUser.id,
        nom: currentUser.nom,
        prenom: currentUser.prenom,
        start_date: currentUser.start_date,
        balance: currentUser.balance,
        statut: currentUser.statut,
        adresse: currentUser.adresse,
        adresse_mail: currentUser.adresse_mail,
        num_tel: currentUser.num_tel,
        birth: currentUser.birth,
        exp_pro: currentUser.exp_pro,
        exp_mit: currentUser.exp_mit,
    }
    console.log(initialValues)
    const handleSubmit = (values : UserType) => {
        console.log("final value", values)
    }
    /*const [id, setId] = useState<number>(null)

    useEffect(() => {
        fetch("http://localhost:8080/Collaborateurs/"+ userId)
            .then((res) => { return res.json()
            }).then((response) => {
                setId(response.id)
        }).catch((err)=>{
            console.log(err.message)
        })
    },[])
*/


    return(
        <Box m="20px">
            <Header title="MODIFICATION D'UN UTILISATEUR" subtitle="Modification des informations personnelles de " />
            <UserForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
        </Box>
    )
}


export default EditUser;