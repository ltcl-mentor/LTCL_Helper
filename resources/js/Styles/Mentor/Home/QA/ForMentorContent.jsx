import styled from 'styled-components';
import { generateMedia } from "styled-media-query";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import ListItem from "@mui/material/ListItem";
import Tab from "@mui/material/Tab";
import BreakingPoint from '@/Styles/BreakingPoint';

const customMedia = generateMedia({ mobile: `${BreakingPoint}px`, });

export const StyleDiv = styled.div`
    width: 90%;
    margin: 0 auto;
`

export const QuestionText = styled(Box)`
    ${customMedia.greaterThan("mobile")`
        display: flex;
    `};
`

export const QuestionTitle = styled.div`
    ${customMedia.greaterThan("mobile")`
        margin-left: 16px;
    `};
    margin-top: 5.6px;
    color: black
`

export const StatusButton = styled(Button)`
    &&& { margin-left: 16px; }
`

export const PrivateButton = styled(Button)`
    &&& {
        border-color: gray;
        color: gray;
    }
`

export const Questions = styled(Box)`
    width: 95%;
    margin: 0 auto;
`

export const Question = styled(ListItem)`
    display: flex;
    text-align: flex-start;
`

export const CardText = styled.p`
    font-size: 25px;
`

export const CardArea = styled(Box)`
    margin-bottom: 8px;
    display: flex;
    justify-content: flex-start;
`

export const StyleCard = styled(Card)`
    width: 140px;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Pagination = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 16px:
`

export const StyleTab = styled(Tab)`
    &&& {
        color: #771AF8;
        font-size: 20px;
    }
`

export const TabArea = styled(Box)`
    &&& { border-bottom: 1px solid #e5e7eb; }
`
