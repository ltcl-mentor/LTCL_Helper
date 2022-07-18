import styled from 'styled-components';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export const StyleTextField = styled(TextField)`
    margin-top: 10px;
    padding-top: 16px;
    width: 100%;
`

export const StyleDiv = styled.div`
    margin-bottom: 16px;
`

export const GridItem = styled(Grid)`
    flex-grow: ${(props) => props.grow};
    height: 100%;
`

export const StyleGrid = styled(Grid)`
    justify-content: space-between;
    height: 70px;
`

export const Content = styled(Box)`
    width: 80%;
    margin: 50px auto 0;
`
