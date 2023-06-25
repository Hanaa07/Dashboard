import {DatePicker, DatePickerProps} from "@mui/x-date-pickers";
import {useField, useFormikContext} from "formik";
import React from "react";
import dayjs from "dayjs";

type Props <TInputDate, TDate> = {
    name: string;
} & Omit<DatePickerProps<TDate>, "onChange" | "value">

const DatePickerField = <TInputDate, TDate = TInputDate>(
    props: Props<TInputDate, TDate>
) => {
    const { name, ...restProps } = props;
    const [field] = useField(name);
    const {setFieldValue} = useFormikContext();

    return (
        <DatePicker
            {...restProps}
            value={field.value ? dayjs(field.value) : null}
            onChange={(val) => setFieldValue(name,val)}
        />
    );
};
export default DatePickerField;