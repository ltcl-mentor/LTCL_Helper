import styled from 'styled-components';
import { generateMedia } from "styled-media-query";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import BreakingPoint from '@/Styles/BreakingPoint';

const customMedia = generateMedia({
    mobile: `${BreakingPoint}px`,
    tablet: `930px`
});

export const StyleContent = styled.div`
    width: 90%;
    margin: 30px auto;
`

export const Heading = styled.div`
    color: #771AF8;
    font-weight: bold;
    font-size: 24px;
`

export const AddLink = styled.div`
    text-align: right;
    color: #771AF8;
    font-size: 20px;
    text-decoration: underline;
    cursor: pointer;
`

export const StyleGrid = styled(Grid)`
    &&& { width: 65%; }
    margin: 30px auto;
    display: flex;
`

export const GridItem = styled(Grid)`
    width: 33%;
    flex-grow: ${(props) => props.grow && props.grow};
    ${customMedia.lessThan("mobile")`
        width: 100%;
    `};
    ${customMedia.between("mobile", "tablet")`
        width: 50%;
    `};
`

export const StyleCard = styled(Card)`
    width: 180px;
    margin: 0 auto 16px;
    position: relative;
    cursor: pointer;
    &:before {
        content: "";
        padding-top: 100%;
        display: block;
    }
`

export const CardText = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px;
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    text-align: center;
    white-space: pre-wrap;
`

export const NoExist = styled.div`
    font-size: 20px;
    margin-bottom: 40px;
    margin-top: 16px;
    text-align: center;
`

export const Users = styled(Box)`
    width: 100%;
    margin-top: 12px;
`
