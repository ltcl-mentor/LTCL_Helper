import React from 'react';
import { Heading } from '@/Styles/Public/Home/Top/Information/weather';
import AccordionContent from './accordionContent';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/**
 * 今後8時間の天気アコーディオン
 */
const hourlyWeather = ({ expanded, weather, handleChange }) => {
    return (
        <Accordion expanded={expanded === 1} onChange={handleChange(1)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
            >
                <Heading>今後8時間の天気</Heading>
            </AccordionSummary>
            <AccordionDetails>
                <AccordionContent weather={weather} />
            </AccordionDetails>
        </Accordion>
    );
};

export default hourlyWeather;
