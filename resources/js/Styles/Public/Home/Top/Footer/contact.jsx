import styled from 'styled-components';
import { generateMedia } from "styled-media-query";
import Box from "@mui/material/Box";
import BreakingPoint from "@/Styles/BreakingPoint";
import TextField from '@mui/material/TextField';

const customMedia = generateMedia({ mobile: `${BreakingPoint}px`, });

export const StyleBox = styled(Box) `
    width: 90%;
    margin: 0 auto;
`

export const StyleTextBox = styled(Box)`
    margin-top: 8px;
    ${(props) => `text-align: ${props.align}`};
`

export const Category = styled(TextField)`
    &&& {
        width: 30%;
        margin-left: 10%;
        ${customMedia.lessThan("mobile")`
            width: 100%;
        `};
    }
`

export const StyleTextField = styled(TextField)`
    padding-top: 8px;
    width: 80%;
    ${customMedia.lessThan("mobile")`
        width: 100%;
    `};
`

export const ConfirmMessage = styled.div`
    font-size: 20px;
    margin-top: 10px;
    text-align: center;
`
