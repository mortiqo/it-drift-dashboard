import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { keywords, keywordColors } from "../config/keywords";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = () => {
    const [chartData, setChartData] = useState(null);
    const [selectedKeywords, setSelectedKeywords] = useState(keywords);
    const [dateFilter, setDateFilter] = useState("all");

    useEffect(() => {
        axios.get('/data/jira_export_cleaned.json')
            .then((response) => {
                const tickets = response.data;

                // Filtrer datoer basert på valgt intervall
                const now = new Date();
                let filteredTickets = tickets;

                if (dateFilter !== 'all') {
                    const daysMap = { '1d': 1, '7d': 7, '30d': 30 };
                    const cutoffDate = new Date(now);
                    cutoffDate.setDate(now.getDate() - daysMap[dateFilter]);

                    filteredTickets = tickets.filter(ticket => {
                        const ticketDate = new Date(ticket.created);
                        return ticketDate >= cutoffDate;
                    });
                }

                const counts = {};

                filteredTickets.forEach(ticket => {
                    const date = ticket.created.slice(0, 10);
                    const title = ticket.title.toLowerCase();

                    if (!counts[date]) {
                        counts[date] = {};
                        selectedKeywords.forEach(k => counts[date][k] = 0);
                    }

                    selectedKeywords.forEach(keyword => {
                        if (title.includes(keyword)) {
                            counts[date][keyword]++;
                        }
                    });
                });

                const sortedDates = Object.keys(counts).sort();
                const datasets = selectedKeywords.map(keyword => ({
                    label: keyword,
                    data: sortedDates.map(date => counts[date][keyword] || 0),
                    borderColor: keywordColors[keyword],
                    backgroundColor: keywordColors[keyword],
                    fill: false,
                    tension: 0.2
                }));

                setChartData({
                    labels: sortedDates,
                    datasets: datasets
                });
            })
            .catch((error) => {
                console.error('Feil ved henting av data:', error);
            });
    }, [selectedKeywords, dateFilter]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Antall saker per dag'
            }
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            },
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div>
            <h4>Utvikling over tid</h4>

            <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}>
                {/* Dato filter */}
                <div>
                    <strong>Dato:</strong><br />
                    <select onChange={(e) => setDateFilter(e.target.value)} value={dateFilter}>
                        <option value="all">Alle</option>
                        <option value="1d">Siste 1 dag</option>
                        <option value="7d">Siste 7 dager</option>
                        <option value="30d">Siste 30 dager</option>
                    </select>
                </div>

                {/* Nøkkelord filter */}
                <div>
                    <strong>Nøkkelord:</strong><br />
                    {keywords.map(keyword => (
                        <div key={keyword}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedKeywords.includes(keyword)}
                                    onChange={() => {
                                        if (selectedKeywords.includes(keyword)) {
                                            setSelectedKeywords(prev => prev.filter(k => k !== keyword));
                                        } else {
                                            setSelectedKeywords(prev => [...prev, keyword]);
                                        }
                                    }}
                                />
                                {keyword}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {chartData ? (
                <Line data={chartData} options={options} />
            ) : (
                <p>Laster data...</p>
            )}
        </div>
    );
};

export default LineChart;
