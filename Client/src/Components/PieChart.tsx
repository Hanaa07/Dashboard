import React from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {AbsenceType} from "../Types/AbsenceType.tsx";

ChartJS.register(ArcElement, Tooltip, Legend);

type ChartProps = {
    intervalType: number,
    nbrTotalPresences: number,
    absences: AbsenceType[]
}

const PieChart = (props : ChartProps) => {
    const {absences, intervalType, nbrTotalPresences} = props;

    let nbrAbsenceTotal = 0;

    absences.map(absence => {
        if (absence.days) {
            nbrAbsenceTotal += absence.days;
        }
    })

    const presences = nbrTotalPresences - nbrAbsenceTotal;

    const totalAbsencesPercentage = ((nbrAbsenceTotal/ nbrTotalPresences) * 100).toFixed(2);
    const presencesPercentage = ((presences/ nbrTotalPresences) * 100).toFixed(2);

    const options : ChartOptions<"doughnut"> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
        },
        maintainAspectRatio: false,
    };

    const data : any = {
        labels: ['Absence', 'Présence'],
        datasets: [
            {
                label: '%',
                data: [totalAbsencesPercentage, presencesPercentage],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                ],
                borderColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                ],
                borderWidth: 1,
            },
        ],
    };
        return <Doughnut options={options} data={data} height={250}/>

};

export default PieChart;