import {Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, useTheme, Typography} from "@mui/material";
import dayjs from 'dayjs'
import {DatePicker} from '@mui/x-date-pickers'
import {Formik} from "formik";
import * as yup from "yup";
import {useMediaQuery} from "@mui/material";
import Header from "../../Components/Header.tsx";
import {tokens} from "../../Theme.tsx";
import {Link, Path} from "react-router-dom";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import {useState} from "react";

interface FormItemProps {
    title: string;
    to: string | Partial<Path>;
    icon: any;
    selected: string;
    setSelected: (value: (((prevState: string) => string) | string)) => void;
}
const FormItem = ({ title, to, icon, selected, setSelected}: FormItemProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.gray[100],
            }}
            onClick={()=> setSelected(title)}
            icon={icon}
        >
            <Link to={to} >
                <Typography>{title}</Typography>
            </Link>
        </MenuItem>
    )
}

const initialValues={
    Nom: "",
    Prenom: "",
    Adresse_mail: "",
    Num_tel: "",
    statut: "",
    start_date: "",
    Adresse: "",
    Exp_pro: "",
    Exp_MIT: "",
}

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = yup.object().shape({
    Nom: yup.string().required("required"),
    Prenom: yup.string().required("required"),
    Adresse_mail: yup.string().email("email invalide").required("required"),
    Num_tel: yup
        .string()
        .matches(phoneRegExp, "Num invalide")
        .required("required"),
    start_date: yup.string().required("required"),
    statut: yup.string().required("required"),
    Adresse: yup.string().required("required"),
    Exp_pro: yup.string().required("required"),
    Exp_MIT: yup.string().required("required"),
})



const UserForm = () => {
    const [selected, setSelected] = useState<string>("UserForm");
  const isNonMobile = useMediaQuery("(min-width: 600px)")
  const handleFormSubmit = (values) => {
      console.log(values);
  }
    return <Box m="20px">
        <Header title="AJOUT UTILISATEUR" subtitle="Ajouter un nouvel utilisateur" />
        
        <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={userSchema}
        >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4,minmax(0, 1fr))"
                        sx={{
                            "& > div" : { gridColumn: isNonMobile ? undefined : "span 2"},
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="text"
                            label="Nom"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.Nom}
                            name="Nom"
                            error={!!touched.Nom && !!errors.Nom}
                            helperText={touched.Nom && errors.Nom}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="text"
                            label="Prénom"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.Prenom}
                            name="Prenom"
                            error={!!touched.Prenom && !!errors.Prenom}
                            helperText={touched.Prenom && errors.Prenom}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="text"
                            label="N° de téléphone"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.Num_tel}
                            name="Num_tel"
                            error={!!touched.Num_tel && !!errors.Num_tel}
                            helperText={touched.Num_tel && errors.Num_tel}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="text"
                            label="Adresse mail"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.Adresse_mail}
                            name="Adresse_mail"
                            error={!!touched.Adresse_mail && !!errors.Adresse_mail}
                            helperText={touched.Adresse_mail && errors.Adresse_mail}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <FormControl fullwidth sx={{ gridColumn: "span 2" }}>
                        <InputLabel id="select-statut">Statut</InputLabel>
                        <Select
                            variant="outlined"
                            labelId="select-statut"
                            id="select-statut"
                            label="Statut"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.statut}
                            name="statut"
                            error={!!touched.statut && !!errors.statut}
                            helperText={touched.statut && errors.statut}
                            SelectProps={{
                                multiple: true
                            }}>
                            <MenuItem value="STG">Stagiaire</MenuItem>
                            <MenuItem value="SAL">Salarié</MenuItem>
                            <MenuItem value="MGR">Manager</MenuItem>
                        </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="text"
                            label="Adresse"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.Adresse}
                            name="Adresse"
                            error={!!touched.Adresse && !!errors.Adresse}
                            helperText={touched.Adresse && errors.Adresse}
                            sx={{ gridColumn: "span 2" }}
                        />
                            <DatePicker
                            /*value = {values.start_date}*/
                            label="Date d'entrée"
                            defaultValue={dayjs()}
                            sx={{ gridColumn: "span 2" }}
                            />
                            <DatePicker
                                /*value = {values.start_date}*/
                                label="Expérience professionnelle"
                                defaultValue={dayjs()}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <DatePicker
                                /*value = {values.start_date}*/
                                label="Expérience à MonarkIT"
                                defaultValue={dayjs()}
                                sx={{ gridColumn: "span 2" }}
                            />
                    </Box>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                        <Button type="reset" color="error" variant="contained" disableElevation style={{ marginRight: "10px" }}>
                            <FormItem title="Annuler" to="/Collaborateurs" icon={<PeopleOutlinedIcon/>} selected={selected} setSelected={setSelected}/>
                        </Button>
                        <Button
                            type="submit"
                            color="secondary"
                            variant="contained"
                            disableElevation>
                            <FormItem title="Confirmer" to="/Collaborateurs" icon={<PeopleOutlinedIcon/>} selected={selected} setSelected={setSelected}/>
                        </Button>
                    </div>
                </form>
            )}
        </Formik>
    </Box>
}

export default UserForm;