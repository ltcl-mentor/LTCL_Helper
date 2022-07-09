import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import Typography from '@material-ui/core/Typography';

export const Weather = styled(Grid)`
    width: 200px;
`

export const WeatherImg = styled.img`
    height: 150px;
    width: 150px;
`

export const Heading = styled.div`
    &&& {
        margin-top: 4px;
        text-align: center;
        font-size: 16px;
        line-height: 1.5;
    }
`

export const Temperature = styled.div`
    margin-bottom: 4px;
    font-size: 20px;
    text-align: center;
`

export const WeatherInfo = styled(Grid)`
    margin-top: 12px;
    margin-bottom: 12px;
`
export const AccordionTable = styled(Table)`
    width: 90%;
    margin: 0 auto;
`

export const AccordionTitle = styled(Typography)`
    text-align: center;
    font-size: 16px;
    line-height: 1.5;
`
export const GridTemperature = styled(Grid)`
    justify-content: center;
    align-items: center;
`
