import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Form } from 'react-bootstrap';
import { keywords, keywordColors } from "../config/keywords";

ChartJS.register(ArcElement, Tooltip, Legend);

const KeywordChart = () => {
    const [chartData, setChartData] = useState(null);

    const [selectedKeyword, setSelectedKeyword] = useState('annet');

    const [rawCounts, setRawcounts] = useState({});

    useEffect(() => {
        axios.get('/data/jira_export_cleaned.json')
        .then((response) => {
            const tickets = response.data;
            const counts = { tilgang: 0, azure: 0, account: 0, grow: 0, kompas: 0, bace: 0, deaktivert: 0, laptop: 0, annet: 0 };

            tickets.forEach(ticket => {
                const title = ticket.title.toLowerCase();
                let matched = false;

                keywords.forEach(keyword => {
                    if (title.includes(keyword)) {
                        counts[keyword]++;
                        matched = true;
                    }
                });
                if (!matched) {
                    counts.annet++;
                }
            });


            setRawcounts(counts);
            setChartData(buildChartData(counts, 'annet'));
        })
        .catch((error) => {
            console.error('feil ved henting av data:', error);
        });
    }, []);



const buildChartData = (counts, filter) => {
    const filteredCounts = filter === 'annet'
        ? counts 
        : { [filter]: counts[filter] };

    const labels = Object.keys(filteredCounts);
    const data = Object.values(filteredCounts);

    
    const backgroundColor = labels.map(label => keywordColors[label] || '#999999');


    return {
        labels,
        datasets: [{
            data,
            backgroundColor,
            borderWidth: 1
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
                <option value="annet">Annet</option>
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