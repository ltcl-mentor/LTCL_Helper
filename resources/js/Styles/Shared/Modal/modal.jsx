import styled from 'styled-components';
import { generateMedia } from "styled-media-query";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BreakingPoint from "@/Styles/BreakingPoint";
import IconButton from '@mui/material/IconButton';

const customMedia = generateMedia({ mobile: `${BreakingPoint}px`, });

export const ModalHeading = styled.div`
    color: #771AF8;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    word-break: break-word;
`

export const ModalSubHeading = styled.div`
    color: #666666;
    font-size: 20px;
    font-weight: bold;
    margin-top: 14px;
`

export const Content = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 4px;
    padding: 24px;
    max-height: 80%;
    overflow-y: scroll;
    &:focus {
        border: none;
    }
    width: 70%;
    ${customMedia.lessThan("mobile")`
        width: 95%;
    `};
`

export const ButtonPos = styled.div`
    text-align: center;
    margin-top: 32px;
    margin-bottom: 24px;
`

export const Submit = styled(Button)`
    &&& {
        color: #771AF8;
        border: 1px solid #771AF8;
        font-weight: bold;
        &:hover {
            color: white;
            background-color: #771AF8;
            border: 1px solid #771AF8;
        }
    }
`

export const Close = styled(IconButton)`
    &&& {
        color: red;
        margin-left: 95%;
    }
`
