import {Box, Button, TextField, useTheme,Typography} from "@mui/material";
import {Formik, FormikValues} from "formik";
import * as yup from "yup";
import {useMediaQuery} from "@mui/material";
import {tokens} from "../Theme.tsx";
import {useNavigate} from "react-router-dom";
import {AbsenceType} from "../Types/AbsenceType.tsx";
import DatePickerField from "./DatepickerField.tsx";
import React from "react";
import {Dayjs} from "dayjs";

type AbsenceProps = {
    initialValues: AbsenceType | null,
    onSubmit: (value: FormikValues) => void,
}

const AbsenceForm = (props : AbsenceProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const navigate = useNavigate();

    const {initialValues, onSubmit} = props;

    const absenceSchema = yup.object().shape({
        absenceStartedAt: yup.date().required("required"),
        absenceEndedAt: yup.date().required("required"),
        days: yup.number().required("required"),
    })
    const isWeekend = (date: Dayjs) => {
        const day = date.day();

        return day === 0 || day === 6;
    };

    return <Box m="20px">
        <Formik
            initialValues={{
                absenceStartedAt: initialValues?.absenceStartedAt,
                absenceEndedAt: initialValues?.absenceEndedAt,
                days: initialValues?.days
            }}
            onSubmit={values => {
                onSubmit(values)
            }}
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
                        <DatePickerField
                            name="absenceStartedAt"
                            format={"DD/MM/YYYY"}
                            onBlur={handleBlur}
                            error={!!touched.absenceStartedAt && !!errors.absenceStartedAt}
                            helpertext={touched.absenceStartedAt && errors.absenceStartedAt}
                            slotProps={{ textField: {label: "Date de début d'absence"}}}
                            sx={{ gridColumn: "span 2" }}
                            shouldDisableDate={isWeekend}
                        />
                        <DatePickerField
                            name="absenceEndedAt"
                            format={"DD/MM/YYYY"}
                            onBlur={handleBlur}
                            error={!!touched.absenceEndedAt && !!errors.absenceEndedAt}
                            helpertext={touched.absenceEndedAt && errors.absenceEndedAt}
                            slotProps={{ textField: {label: "Date de fin d'absence"}}}
                            sx={{ gridColumn: "span 2" }}
                            shouldDisableDate={isWeekend}
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

export default AbsenceForm;
