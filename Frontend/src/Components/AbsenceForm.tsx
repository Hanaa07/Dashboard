import {Box, Button, TextField, useTheme,Typography} from "@mui/material";
import {Formik, FormikValues} from "formik";
import * as yup from "yup";
import {useMediaQuery} from "@mui/material";
import {tokens} from "../Theme.tsx";
import {Link, useNavigate} from "react-router-dom";
import {AbsenceType} from "../Types/AbsenceType.tsx";
import DatePickerField from "./DatepickerField.tsx";
import React from "react";

type AbsenceProps = {
    initialValues: AbsenceType,
    onSubmit: (value: FormikValues) => void,
}



const AbsenceForm = (props : AbsenceProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const navigate = useNavigate();

    const {initialValues, onSubmit} = props;

    const absenceSchema = yup.object().shape({
        first_name: yup.string().required("required"),
        last_name: yup.string().required("required"),
        start_date: yup.date().required("required"),
        end_date: yup.date().required("required"),
        days: yup.number().required("required"),
    })
    return <Box m="20px">
        <Formik
            initialValues={initialValues}
            onSubmit={values => onSubmit(values)}
            validationSchema={absenceSchema}
        >
            {({ values, errors, touched, handleBlur, setFieldValue, handleSubmit}) => (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4,minmax(0, 1fr))"
                        sx={{
                            "& .css-5evozk-MuiInputBase-root-MuiOutlinedInput-root" : {
                                backgroundColor: `${colors.primary[500]}`,
                            },
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
                            "& .css-13hkz5-MuiInputBase-root-MuiOutlinedInput-root": {
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
                            value={values.last_name}
                            name="last_name"
                            error={!!touched.last_name && !!errors.last_name}
                            helpertext={touched.last_name && errors.last_name}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullwidth="true"
                            variant="outlined"
                            type="text"
                            label="Prénom"
                            onBlur={handleBlur}
                            value={values.first_name}
                            name="first_name"
                            error={!!touched.first_name && !!errors.first_name}
                            helpertext={touched.first_name && errors.first_name}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <DatePickerField
                            name="start_date"
                            format={"DD/MM/YYYY"}
                            onBlur={handleBlur}
                            error={!!touched.start_date && !!errors.start_date}
                            helpertext={touched.start_date && errors.start_date}
                            slotProps={{ textField: {label: "Date de début d'absence"}}}
                            sx={{ gridColumn: "span 2" }}
                            disableFuture
                        />
                        <DatePickerField
                            name="end_date"
                            format={"DD/MM/YYYY"}
                            onBlur={handleBlur}
                            error={!!touched.end_date && !!errors.end_date}
                            helpertext={touched.end_date && errors.end_date}
                            slotProps={{ textField: {label: "Date de fin d'absence"}}}
                            sx={{ gridColumn: "span 2" }}
                            disableFuture
                        />
                        <TextField
                            fullwidth="true"
                            variant="outlined"
                            type="tel"
                            label="Nombre de jours d'absence"
                            onBlur={handleBlur}
                            onChange={(e) => {
                                setFieldValue("days", e.target.value)
                            }}
                            value={values.days}
                            name="days"
                            error={!!touched.days && !!errors.days}
                            helpertext={touched.days && errors.days}
                            sx={{ gridColumn: "span 2" }}
                        />
                    </Box>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                        <Button
                            type="reset"
                            color="error"
                            variant="contained"
                            disableElevation
                            style={{ marginRight: "10px" }}
                            sx={{ backgroundColor: colors.redAccent[700], color: colors.gray[100] }}
                            onClick={() => navigate(-1)}
                        >
                            <Typography>Annuler</Typography>
                        </Button>
                        <Button
                            type="submit"
                            color="secondary"
                            sx={{ backgroundColor: colors.greenAccent[700], color: colors.gray[100] }}
                            variant="contained"
                            disableElevation>
                            <Typography>Confirmer</Typography>
                        </Button>
                    </div>
                </form>
            )}
        </Formik>
    </Box>
}

export default AbsenceForm;
