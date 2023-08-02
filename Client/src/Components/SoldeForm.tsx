import {Box, Button, TextField, useTheme, Typography} from "@mui/material";
import DatepickerField from "./DatepickerField.tsx";
import {Formik, FormikValues} from "formik";
import * as yup from "yup";
import {useMediaQuery} from "@mui/material";
import {tokens} from "../Theme.tsx";
import {useNavigate} from "react-router-dom";
import {SoldeType} from "../Types/SoldeType.tsx";

type SoldeProps = {
    initialValues: SoldeType | null,
    onSubmit: (value: FormikValues) => void,
}

const SoldeForm = (props : SoldeProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const navigate = useNavigate();

    const {initialValues, onSubmit} = props;

    const soldeSchema = yup.object().shape({
        balanceStartedAt: yup.date().required("required"),
        balanceEndedAt: yup.date().required("required"),
        initialDays: yup.number().required("required"),
        remainingDays: yup.number().required("required"),
    })

    return <Box m="20px">
        <Formik
            initialValues={{
                balanceStartedAt: initialValues?.balanceStartedAt,
                balanceEndedAt: initialValues?.balanceEndedAt,
                initialDays: initialValues?.initialDays,
                remainingDays: initialValues?.remainingDays
            }}
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
                            name="balanceStartedAt"
                            format={"DD/MM/YYYY"}
                            onBlur={handleBlur}
                            error={!!touched.balanceStartedAt && !!errors.balanceStartedAt}
                            helpertext={touched.balanceStartedAt && errors.balanceStartedAt}
                            slotProps={{ textField: {label: "Date de début"}}}
                            sx={{ gridColumn: "span 2" }}
                            disableFuture
                        />
                        <DatepickerField
                            name="balanceEndedAt"
                            format={"DD/MM/YYYY"}
                            onBlur={handleBlur}
                            error={!!touched.balanceEndedAt && !!errors.balanceEndedAt}
                            helpertext={touched.balanceEndedAt && errors.balanceEndedAt}
                            slotProps={{ textField: {label: "Date de fin"}}}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullwidth="true"
                            variant="outlined"
                            type="tel"
                            label="Solde"
                            onBlur={handleBlur}
                            onChange={(e) => {
                                setFieldValue("initialDays", e.target.value)
                            }}
                            value={values.initialDays}
                            name="initialDays"
                            error={!!touched.initialDays && !!errors.initialDays}
                            helpertext={touched.initialDays && errors.initialDays}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullwidth="true"
                            variant="outlined"
                            type="tel"
                            label="Jours restants du solde"
                            onBlur={handleBlur}
                            onChange={(e) => {
                                setFieldValue("remainingDays", e.target.value)
                            }}
                            value={values.remainingDays}
                            name="remainingDays"
                            error={!!touched.remainingDays && !!errors.remainingDays}
                            helpertext={touched.remainingDays && errors.remainingDays}
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
