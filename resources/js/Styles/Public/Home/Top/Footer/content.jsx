import styled from 'styled-components';
import Grid from "@mui/material/Grid";

export const StyleDiv = styled.div`
    width: 80%;
    margin: 0 auto;
`

export const StyleGrid = styled(Grid)`
    &&& { width: 80%; }
    margin: 0 auto;
`

export const GridItem = styled(Grid)`
    width: 50%;
`

export const Contact = styled.span`
    color: black;
    font-weight: bold;
    font-size: 20px;
    display: inline-block;
    cursor: pointer;
    margin-top: 8px;
`
