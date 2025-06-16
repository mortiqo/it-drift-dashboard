import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Form } from 'react-bootstrap';
import { keywords, keywordColors } from "../config/keywords";

ChartJS.register(ArcElement, Tooltip, Legend);

const KeywordChart = () => {
    const [chartData, setChartData] = useState(null);

    const [selectedKeyword, setSelectedKeyword] = useState('alle');

    const [rawCounts, setRawcounts] = useState({});

    useEffect(() => {
        axios.get('/data/jira_export_cleaned.json')
        .then((response) => {
            const tickets = response.data;
            const counts = { tilgang: 0, feil: 0, konto: 0, grow: 0, sikkerhet: 0, utstyr: 0 };

            tickets.forEach(ticket => {
                const title = ticket.title.toLowerCase();
                keywords.forEach(keyword => {
                    if (title.includes(keyword)) {
                        counts[keyword]++;
                    }
                });
            });

            setRawcounts(counts);
            setChartData(buildChartData(counts, 'alle'));
        })
        .catch((error) => {
            console.error('feil ved henting av data:', error);
        });
    }, []);



const buildChartData = (counts, filter) => {
    const filteredCounts = filter === 'alle'
        ? counts 
        : { [filter]: counts[filter] };

    
    const backgroundColor = filter === 'alle'
        ? keywordColors.alle
        : [keywordColors[filter]];


    return {
        labels: Object.keys(filteredCounts),
        datasets: [{
            label: 'Antall saker',
            data: Object.values(filteredCounts),
            backgroundColor,
            borderWidth: 1,
        }]
    };
};

const handleFilterChange = (e) => {
    const keyword = e.target.value;
    setSelectedKeyword(keyword);
    setChartData(buildChartData(rawCounts, keyword));
};

return (
    <div>
        <h4>Fordeling av nøkkelord i saker</h4>

        <Form.Group className="mb-3">
            <Form.Label>Filtrer på nøkkelord:</Form.Label>
            <Form.Select value={selectedKeyword} onChange={handleFilterChange}>
                <option value="alle">Alle</option>
                {keywords.map((kw) => (
                    <option key={kw} value={kw}>{kw}</option>
                ))}
            </Form.Select>
        </Form.Group>

        {chartData ? <Pie data={chartData} /> : <p>Laster data...</p>}  
    </div>
);
};

export default KeywordChart;