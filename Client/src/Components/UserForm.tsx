import {Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, useTheme, Typography} from "@mui/material";
import DatepickerField from "./DatepickerField.tsx";
import {Formik, FormikValues} from "formik";
import * as yup from "yup";
import {useMediaQuery} from "@mui/material";
import {tokens} from "../Theme.tsx";
import {useNavigate} from "react-router-dom";
import React from "react";
import {UserType} from "../Types/UserType.tsx";


type UserProps = {
    initialValues: UserType | null,
    onSubmit: (value: FormikValues) => void,
}

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const UserForm = (props: UserProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const navigate = useNavigate();

    const {initialValues, onSubmit} = props;
    
    const userSchema = yup.object().shape({
        lastName: yup.string().required("required"),
        firstName: yup.string().required("required"),
        email: yup.string().email("email invalide").required("required"),
        phone: yup
            .string()
            .matches(phoneRegExp, "Num invalide")
            .required("required"),
        joinedIn: yup.date().required("required"),
        statut: yup.string().required("required"),
        adresse: yup.string().required("required"),
        exp_pro: yup.date().required("required"),
        exp_mit: yup.date().required("required"),
        birth: yup.date().required("required"),
    })

    return <Box m="20px">
        <Formik
            initialValues={{
                firstName: initialValues.firstName,
                lastName: initialValues.lastName,
                adresse: initialValues.adresse,
                email: initialValues.email,
                phone: initialValues.phone,
                joinedIn: initialValues.joinedIn,
                statut: initialValues.statut,
                exp_pro: initialValues.exp_pro,
                exp_mit: initialValues.exp_mit,
                birth: initialValues.birth,
            }}
            onSubmit={values => onSubmit(values)}
            validationSchema={userSchema}
        >
            {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue}) => (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4,minmax(0, 1fr))"
                        sx={{
                            "& > div" : { gridColumn: isNonMobile ? undefined : "span 2"},
                            "& .css-jl329p-MuiFormLabel-root-MuiInputLabel-root.Mui-focused" : {
                                color : colors.gray[100],
                            },
                            "& .css-5evozk-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline" : {
                                color : colors.gray[100],
                                borderColor : colors.gray[100],
                            },
                            "& .css-lbnksu-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline" : {
                                borderColor : colors.gray[100],
                            },
                            "& .css-13hkz5-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline" : {
                                borderColor : colors.gray[100],
                            },
                            "& .css-5evozk-MuiInputBase-root-MuiOutlinedInput-root" : {
                                backgroundColor: `${colors.primary[500]}`,
                            },
                            "& .css-lbnksu-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root" : {
                                backgroundColor: `${colors.primary[500]}`,
                            },
                            "& .css-13hkz5-MuiInputBase-root-MuiOutlinedInput-root" : {
                                backgroundColor: `${colors.primary[500]}`,
                            },
                        }}
                    >
                        <TextField
                            fullwidth="true"
                            variant="outlined"
                            type="text"
                            label="Nom"
                            onBlur={handleBlur}
                            onChange={(e) => {
                                setFieldValue("lastName", e.target.value)
                            }}
                            value={values.lastName}
                            name="lastName"
                            error={!!touched.lastName && !!errors.lastName}
                            helpertext={touched.lastName && errors.lastName}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullwidth="true"
                            variant="outlined"
                            type="text"
                            label="Prénom"
                            onBlur={handleBlur}
                            onChange={(e) => {
                                setFieldValue("firstName", e.target.value)
                            }}
                            value={values.firstName}
                            name="firstName"
                            error={!!touched.firstName && !!errors.firstName}
                            helpertext={touched.firstName && errors.firstName}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullwidth="true"
                            variant="outlined"
                            type="text"
                            label="N° de téléphone"
                            onBlur={handleBlur}
                            onChange={(e) => {
                                setFieldValue("phone", e.target.value)
                            }}
                            value={values.phone}
                            name="phone"
                            error={!!touched.phone && !!errors.phone}
                            helpertext={touched.phone && errors.phone}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullwidth="true"
                            variant="outlined"
                            type="text"
                            label="Adresse mail"
                            onBlur={handleBlur}
                            onChange={(e) => {
                                setFieldValue("email", e.target.value)
                            }}
                            value={values.email}
                            name="email"
                            error={!!touched.email && !!errors.email}
                            helpertext={touched.email && errors.email}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <FormControl fullwidth="true" sx={{ gridColumn: "span 2" }}>
                            <InputLabel id="select-statut">Statut</InputLabel>
                            <Select
                                variant="outlined"
                                labelId="select-statut"
                                id="select-statut"
                                label="Statut"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    setFieldValue("statut", e.target.value)
                                }}
                                value={values.statut}
                                name="statut"
                                error={!!touched.statut && !!errors.statut}
                                helpertext={touched.statut && errors.statut}
                                selectprops={{
                                    multiple: true
                                }}>
                                <MenuItem value="stagiaire">stagiaire</MenuItem>
                                <MenuItem value="salarié">salarié</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullwidth="true"
                            variant="outlined"
                            type="text"
                            label="Adresse"
                            onBlur={handleBlur}
                            onChange={(e) => {
                                setFieldValue("adresse", e.target.value)
                            }}
                            value={values.adresse}
                            name="adresse"
                            error={!!touched.adresse && !!errors.adresse}
                            helpertext={touched.adresse && errors.adresse}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <DatepickerField
                            name="joinedIn"
                            format={"DD/MM/YYYY"}
                            onBlur={handleBlur}
                            error={!!touched.joinedIn && !!errors.joinedIn}
                            helpertext={touched.joinedIn && errors.joinedIn}
                            slotProps={{ textField: {label: "Date d'entrée"}}}
                            sx={{ gridColumn: "span 2" }}
                            disableFuture
                        />
                        <DatepickerField
                            name="exp_mit"
                            format={"DD/MM/YYYY"}
                            onBlur={handleBlur}
                            error={!!touched.exp_mit && !!errors.exp_mit}
                            helpertext={touched.exp_mit && errors.exp_mit}
                            slotProps={{ textField: {label: "Expérience à MonarkIT"}}}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <DatepickerField
                            name="exp_pro"
                            format={"DD/MM/YYYY"}
                            onBlur={handleBlur}
                            error={!!touched.exp_pro && !!errors.exp_pro}
                            helpertext={touched.exp_pro && errors.exp_pro}
                            slotProps={{ textField: {label: "Expérience professionelle"}}}
                            sx={{ gridColumn: "span 2" }}
                            disableFuture
                        />
                        <DatepickerField
                            name="birth"
                            format={"DD/MM/YYYY"}
                            onBlur={handleBlur}
                            error={!!touched.birth && !!errors.birth}
                            helpertext={touched.birth && errors.birth}
                            slotProps={{ textField: {label: "Date de naissance"}}}
                            sx={{ gridColumn: "span 2" }}
                            disableFuture
                        />
                    </Box>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                        <Button
                            type="reset"
                            color="error"
                            variant="contained"
                            disableElevation
                            style={{ marginRight: "10px" }}
                            sx={{ backgroundColor: colors.redAccent[600], color: colors.gray[100] }}
                            onClick={() => navigate(-1)}
                        >
                                <Typography>Annuler</Typography>
                        </Button>
                        <Button
                            type={'submit'}
                            color = "secondary"
                            sx={{ backgroundColor: colors.greenAccent[700], color: colors.gray[100] }}
                            variant="contained"
                            disableElevation
                        >
                            <Typography>Confirmer</Typography>
                        </Button>
                    </div>
                </form>
            )}
        </Formik>
    </Box>
}

export default UserForm;