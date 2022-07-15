import styled from 'styled-components';
import { generateMedia } from "styled-media-query";
import Button from "@mui/material/Button";
import BreakingPoint from "@/Styles/BreakingPoint";

const customMedia = generateMedia({ mobile: `${BreakingPoint}px`, });

export const DefaultButton = styled(Button)`
    width: 50%;
    &&& {
        font-size: 18px;
        box-shadow: none;
        font-weight: bold;
    }
`

export const PurpleButton = styled(DefaultButton)`
    &&& {
        color: white;
        background-color: #771AF8;
        &:hover {
            background-color: #6633CC;
        }
    }
`

export const GrayButton = styled(DefaultButton)`
    &&& {
        color: #ADA9A9;
        background-color: #ECE9E9;
        &:hover {
            background-color: #DDDDDD;
        }
    }
`

export const WhiteButton = styled(DefaultButton)`
    &&& {
        color: black;
        background-color: white;
        border: 1px solid black;
    }
`
