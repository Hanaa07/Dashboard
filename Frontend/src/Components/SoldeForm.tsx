import {Box, Button, TextField, useTheme, Typography} from "@mui/material";
import DatepickerField from "./DatepickerField.tsx";
import {Formik, FormikValues} from "formik";
import * as yup from "yup";
import {useMediaQuery} from "@mui/material";
import {tokens} from "../Theme.tsx";
import {useNavigate} from "react-router-dom";
import {SoldeType} from "../Types/SoldeType.tsx";

type SoldeProps = {
    initialValues: SoldeType,
    onSubmit: (value: FormikValues) => void,
}

const SoldeForm = (props : SoldeProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const navigate = useNavigate();

    const {initialValues, onSubmit} = props;

    const soldeSchema = yup.object().shape({
        start_date: yup.date().required("required"),
        end_date: yup.date().required("required"),
        balance: yup.number().required("required"),
        days: yup.number().required("required"),
    })

    return <Box m="20px">
        <Formik
            initialValues={initialValues}
            onSubmit={values => onSubmit(values)}
            validationSchema={soldeSchema}
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
                            "& > div" : { gridColumn: isNonMobile ? undefined : "span 2"},
                            "& .css-13hkz5-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline" : {
                                borderColor : colors.gray[100],
                            },
                            "& .css-jl329p-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                                color : colors.gray[100],
                            },
                            "& .css-5evozk-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline" : {
                                borderColor : colors.gray[100],
                            },
                            "& .css-13hkz5-MuiInputBase-root-MuiOutlinedInput-root" : {
                                backgroundColor: `${colors.primary[500]}`,
                            },
                            "& .css-5evozk-MuiInputBase-root-MuiOutlinedInput-root" : {
                                backgroundColor: `${colors.primary[500]}`,
                            },
                    }}
                    >
                        <DatepickerField
                            name="start_date"
                            format={"DD/MM/YYYY"}
                            onBlur={handleBlur}
                            error={!!touched.start_date && !!errors.start_date}
                            helpertext={touched.start_date && errors.start_date}
                            slotProps={{ textField: {label: "Date de début"}}}
                            sx={{ gridColumn: "span 2" }}
                            disableFuture
                        />
                        <DatepickerField
                            name="end_date"
                            format={"DD/MM/YYYY"}
                            onBlur={handleBlur}
                            error={!!touched.end_date && !!errors.end_date}
                            helpertext={touched.end_date && errors.end_date}
                            slotProps={{ textField: {label: "Date de fin"}}}
                            sx={{ gridColumn: "span 2" }}
                            disableFuture
                        />
                        <TextField
                            fullwidth="true"
                            variant="outlined"
                            type="tel"
                            label="Solde"
                            onBlur={handleBlur}
                            onChange={(e) => {
                                setFieldValue("balance", e.target.value)
                            }}
                            value={values.balance}
                            name="balance"
                            error={!!touched.balance && !!errors.balance}
                            helpertext={touched.balance && errors.balance}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullwidth="true"
                            variant="outlined"
                            type="tel"
                            label="Jours restants du solde"
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
export default SoldeForm;
