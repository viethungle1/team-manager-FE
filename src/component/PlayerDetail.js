import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import { Radar } from 'react-chartjs-2';
import 'chart.js/auto';

export function PlayerDetail() {
    const {id} = useParams();
    const [player, setPlayer] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/players/${id}`).then(res => {
            setPlayer(res.data);
            console.log(res.data);
        })
    }, [id]);

    const data = {
        labels: ['Pace', 'Shooting', 'Passing', 'Agility', 'Defending', 'Physical'],
        datasets: [
            {
                label: player.name,
                data: [player.pace, player.shooting, player.passing, player.agility, player.defending, player.physical],
                backgroundColor: 'rgba(34, 202, 236, 0.2)',
                borderColor: 'rgba(34, 202, 236, 1)',
                borderWidth: 1,
                pointBackgroundColor: 'rgba(34, 202, 236, 1)',
            },
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: {
                    display: true
                },
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    stepSize: 20
                },
                pointLabels: {
                    font: {
                        size: 12
                    }
                }
            }
        }
    };

    const profileStyle = {
        width: '40%',
        marginLeft: '200px'
    };

    const chartStyle = {
        width: '50%',
        height: '400px'
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    };

    return (
        <>
            <div style={containerStyle}>
                <div style={profileStyle}>
                    <p>Name: {player.name}</p>
                    <p>Position: {player?.positions?.map(pos => pos.name).join(', ')}</p>
                    <p>Nation: {player?.nation?.name}</p>
                    <p>Height: {player.height} cm</p>
                    <p>Weight: {player.weight} kg</p>
                    <p>Salary: {player.salary}</p>
                    <p>Profile: {player.profile ? player.profile : 'N/A'}</p>
                    <p>Date of Birth: {player.doB}</p>
                </div>
                <div style={chartStyle}>
                    <Radar data={data} options={options}/>
                </div>
            </div>
        </>
    )
}