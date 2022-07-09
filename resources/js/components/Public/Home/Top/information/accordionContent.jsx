import React from 'react';
import { AccordionTable } from '@/Styles/Public/Home/Top/Information/weather';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

/**
 * 今後8時間の天気
 */
const accordionContent = ({ weather }) => {
    return (
        <AccordionTable size="small">
            <TableHead>
                <TableRow>
                    <TableCell>時間</TableCell>
                    <TableCell align="right">気温</TableCell>
                    <TableCell align="right">天気</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {weather.hourly.map((hourlyData, index) => (
                    <TableRow key={ `${index}-${hourlyData.temp}` }>
                        <TableCell component="th" scope="row">{ hourlyData.time }</TableCell>
                        <TableCell align="right">{ hourlyData.temp }℃</TableCell>
                        <TableCell align="right">{ hourlyData.main }</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </AccordionTable>
    );
};

export default accordionContent;
