import styled from 'styled-components';
import Button from "@mui/material/Button";

export const PurpleButton = styled(Button)`
    &&& {
        color: white;
        font-size: 24px;
        width: 50%;
        height: 60px;
        box-shadow: none;
        background-color: #771AF8;
        border: 1px solid #771AF8;
        font-weight: bold;
        line-height: 100%;
        border-radius: 0;
        &:hover {
            background-color: #6633CC;
        }
    }
`

export const GrayButton = styled(Button)`
    &&& {
        color: #ADA9A9;
        font-size: 24px;
        font-weight: bold;
        width: 50%;
        height: 60px;
        box-shadow: none;
        background-color: #ECE9E9;
        line-height: 100%;
        border-radius: 0;
        &:hover {
            background-color: #DDDDDD;
        }
    }
`
