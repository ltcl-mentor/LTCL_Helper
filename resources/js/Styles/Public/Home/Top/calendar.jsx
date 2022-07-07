import styled from 'styled-components';
import CalendarPicker from '@mui/lab/CalendarPicker';
import Grid from '@mui/material/Grid';

export const StyledDiv = styled.div`
    background-color: #eee;
    padding-top: 16px;
`

export const Calendar = styled(CalendarPicker)`
    &&& { width: 100%; }
`

export const GridChildLeft = styled(Grid)`
    width: 40%;
`

export const GridChildRight = styled(Grid)`
    width: 40%;
`

export const GridParent = styled(Grid)`
    width: 80%;
    margin: 0 auto;
    justify-content: center;
`
export const Heading = styled.div`
    color: #771AF8;
    font-weight: bold;
    font-size: 24px;
    padding-left: 10%;
`
export const WarningMessage = styled.div`
    padding-top: 8px;
    font-size: 20px;
`
