import {Path} from "react-router-dom";

export type FormItemProps = {
    title: string;
    to: string | Partial<Path>;
    icon: any;
    selected: string;
    setSelected: (value: (((prevState: string) => string) | string)) => void;
}


