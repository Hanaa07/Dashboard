import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend, ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from "@mui/material";
import {tokens} from "../Theme.tsx";
import {AbsenceType} from "../Types/AbsenceType.tsx";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend);

type ChartProps = {
    intervalType: number,
    absences: AbsenceType[]
}
const LineChart = (props : ChartProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {absences, intervalType} = props;


    ChartJS.defaults.borderColor = `${colors.gray[500]}`;
    ChartJS.defaults.color = `${colors.gray[100]}`;

    const options : ChartOptions<"line"> = {
        responsive: true,
        plugins: {
            colors: {
                enabled: true,
            },
            legend: {
                position: 'right' as const,
            },
            title: {
                display: true,
                text: '',
            },
            maintainAspectRatio: false,
        },
    };

    const months = [
        'Jan',
        'Fév',
        'Mar',
        'Avr',
        'Mai',
        'Juin',
        'Jul',
        'Aou',
        'Sep',
        'Oct',
        'Nov',
        'Déc',
    ]

    let labels = [];
    let datas = [];
    let presencesDays = [];

    switch (intervalType) {
        case 1:
            absences.map(absence => {
                const startedDate =  new Date(absence.absenceStartedAt);
                if (!labels.includes(startedDate.getDate())) {
                    labels.push(startedDate.getDate())
                }
            })

            labels.map((label, key ) => {
                datas[key] = 0;
                absences.map(absence => {
                    const startedDate =  new Date(absence.absenceStartedAt);
                    if (startedDate.getDate() === label) {
                        datas[key]++
                    }
                })
            })
            break;
        case 2:
        case 3:
        case 4:
            absences.map(absence => {
                const startedDate =  new Date(absence.absenceStartedAt);

                if (!labels.includes(months[startedDate.getMonth()])) {
                    labels.push(months[startedDate.getMonth()])
                }
            })

            labels.map((label, key ) => {
                datas[key] = 0;
                absences.map(absence => {
                    const startedDate =  new Date(absence.absenceStartedAt);
                    if (months[startedDate.getMonth()] === label) {
                        datas[key]++
                    }
                })
            })

            break;
    }


    const chartData : any= {
        labels: labels,
        datasets: [
            {
                label: 'Absences',
                data: datas,
                borderColor: 'rgba(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132)',
            },
            // {
            //     label: 'Présences',
            //     data: [10,40,1,6,20,15,31,17,10,2,0,7],
            //     borderColor: 'rgb(53, 162, 235)',
            //     backgroundColor: 'rgba(53, 162, 235)'',
            // },
            ],

    }

    return (
        <Line
            options={options}
            data={chartData}
            width={900}
        />
    );
};

export default LineChart;