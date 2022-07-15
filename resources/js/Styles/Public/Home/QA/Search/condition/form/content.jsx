import styled from 'styled-components';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export const Heading = styled.div`
    font-weight: bold;
    font-size: 20px;
    margin-top: 24px;
`

export const WarningCategory = styled.span`
    font-weight: normal;
    color: #771AF8;
    font-size: 18px;
    margin-left: 20px;
`

export const WarningCategoryMobile = styled(WarningCategory)`
    font-size: 16px;
    margin-left: 0;
`

export const Reset = styled.div`
    font-size: 18px;
    text-align: right;
    text-decoration: underline;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
`

export const StyleGrid = styled(Grid)`
    justify-content: space-between;
`

export const GridItem = styled(Grid)`
    width: ${(props) => `${props.background}`};
`

export const SearchButton = styled(Button)`
    &&& {
        margin-left: auto;
        color: #771AF8;
        border: 2px solid #771AF8;
        font-weight: bold;
        font-size: 20px;
        display: block;
        &:hover {
            background-color: #771AF8;
            color: white;
            border: 2px solid #771AF8;
        }
    }
`

export const StyleTextField = styled(TextField)`
    width: 90%;
`
