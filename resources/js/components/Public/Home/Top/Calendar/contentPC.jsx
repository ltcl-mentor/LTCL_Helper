import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Calendar, GridParent, GridChildLeft, GridChildRight } from '@/Styles/Public/Home/Top/Calendar/calendar';


/**
 * 校舎情報のPC版
 */
const contentPC = ({ info, date, handleDate }) => {
    return (
        <GridParent container>
            <GridChildLeft item>
                { info }
            </GridChildLeft>
            <GridChildRight item>
                <LocalizationProvider dateAdapter={ AdapterDateFns }>
                    <Calendar date={date} onChange={(newDate) => handleDate(newDate)} />
                </LocalizationProvider>
            </GridChildRight>
        </GridParent>
    );
};

export default contentPC;
