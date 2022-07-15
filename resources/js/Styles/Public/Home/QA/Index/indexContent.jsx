import styled from 'styled-components';
import { generateMedia } from "styled-media-query";
import Card from "@mui/material/Card";
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';

const customMedia = generateMedia({
    baseline1: '540px',
    baseline2: '710px',
    baseline3: '890px',
});


export const StyleGrid = styled(Grid)`
    ${(props) => props.value == 1 && 'justify-content: center'};
`

export const GridItem = styled(Grid)`
    ${customMedia.lessThan("baseline1")`
        width: 50%;
    `};
    ${customMedia.between("baseline1", "baseline2")`
        width: 33%;
    `};
    ${customMedia.between("baseline2", "baseline3")`
        width: ${(props) => (props.value == 0 ? `25%` : `33%`)};
    `};
    ${customMedia.greaterThan("baseline3")`
        width: ${(props) => (props.value == 0 ? `20%` : `33%`)};
    `};
`

export const TopicCard = styled(Card)`
    width: 160px;
    height: 90%;
    margin: auto;
    padding: 0;
    position: relative;
    cursor: pointer;
    &:before {
        content: "";
        padding-top: 100%;
        display: block;
    }
`

export const ActionArea = styled(CardActionArea)`
    &&& {
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    margin: 0;
    width: 100%;
    height: 100%;
`

export const TopicTitle = styled.div`
    text-align: center;
    line-height: 1.5;
    font-weight: bold;
    font-size: ${(props) => (props.index == 9 ? `16px` : `20px`)};
`

export const TopicBody = styled.div`
    margin-top: 8px;
    margin-bottom: 8px;
`

export const TopicContent = styled(TopicTitle)`
    font-size: 16px;
    font-weight: normal;
`
