import {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {HttpClient} from "../utils/request.ts";
import {useCookies} from "react-cookie";
import {AbsenceType} from "../Types/AbsenceType.tsx";
import {UserType} from "../Types/UserType.tsx";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type ChartProps = {
    intervalType: number,
    absence: AbsenceType[],
    user: UserType | null,
}

const BarChart = (props : ChartProps) => {
    const [users, setUsers] = useState<any>([])
    const [cookies] = useCookies<any>([]);
    const [nbrTotalPresences, setNbrTotalPresences] = useState<number>(0);
    const [nbrUsers, setNbrUsers] = useState<number>(0)
    const [selectedUser, setSelectedUser] = useState<UserType|null>(null);
    const {intervalType, absence, user} = props;
    const [absences, setAbsences] = useState<any>([]);


    useEffect(() => {
        const jwt = cookies.jwt ? cookies.jwt : '';
        HttpClient.get("/user/", {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).then(res => {
            let receivedData = res.data;
            console.log(receivedData)

            if (receivedData.success === true) {
                setUsers(receivedData.data);
            }
        });
    }, []);

    useEffect(() => {
        HttpClient.post("/absence/stats", { userId: selectedUser?._id, intervalType: intervalType}).then(res => {
            let receivedData = res.data;

            console.log(res.data.data)

            if (receivedData.success === true) {
                setNbrTotalPresences(receivedData.data.nbrTotalPresences)
                setNbrUsers(receivedData.data.nbrUsers)
                setAbsences(receivedData.data.absences);
            }
        });
    }, [selectedUser, intervalType]);

    const options : any = {
        type: 'horizontalBar',
        indexAxis: 'y' as const,
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
            title: {
                display: true,
            },
        },
        maintainAspectRatio: false,
    };

    const labels = users.slice(0,3).map((user: UserType) => [`${user.firstName} ${user.lastName}`]);
    const presenceDays : any = []

    switch (intervalType) {
        case 1:
            absences.map((absence : any) => {
                if (!presenceDays.includes(((absence.days / nbrTotalPresences) * 100).toFixed(2))) {
                    presenceDays.push(((absence.days / nbrTotalPresences) * 100).toFixed(2))
                }
            })
            break;
        case 2:
            absences.map((absence : any)=> {
                if (!presenceDays.includes(((absence.days / nbrTotalPresences) * 100).toFixed(2))) {
                    presenceDays.push(((absence.days / nbrTotalPresences) * 100).toFixed(2))
                }
            })
            break;
        case 3:
            absences.map((absence : any) => {
                if (!presenceDays.includes(((absence.days / nbrTotalPresences) * 100).toFixed(2))) {
                    presenceDays.push(((absence.days / nbrTotalPresences) * 100).toFixed(2))
                }
            })
            break;
        case 4:
            absences.map((absence : any) => {
                if (!presenceDays.includes(((absence.days / nbrTotalPresences) * 100).toFixed(2))) {
                    presenceDays.push(((absence.days / nbrTotalPresences) * 100).toFixed(2))
                }
            })
            break;
    }
    
    const data = {
        labels,
        datasets: [
            {
                label: 'Présence(%)',
                data: presenceDays,
                borderColor: 'rgba(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.4)',
                borderWidth: 1,
            },
        ],
    };

    return <Bar options={options} data={data} height={13} width={50}/>;
};

export default BarChart;