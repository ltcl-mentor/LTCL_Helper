import styled from "styled-components";
import { generateMedia } from "styled-media-query";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import FormControl from "@mui/material/FormControl";
import Grid from '@mui/material/Grid';
import BreakingPoint from "@/Styles/BreakingPoint";

const customMedia = generateMedia({
    mobile: `${BreakingPoint}px`,
    baseline1: '767px',
    baseline2: '1200px',
    baseline3: '880px',
});


export const StyleDiv = styled.div`
    width: 90%;
    margin: 0 auto;
`

export const StyleBox = styled(Box)`
    width: 95%;
    margin: 0 auto;
`

export const Selector = styled(FormControl)`
    width: 20%;
    ${customMedia.lessThan("baseline1")`
        width: 100%;
    `};
    margin-left: auto;
    margin-top: 16px;
`

export const DocumentPos = styled(Box)`
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
    height: 280px;
    width: 33%;
    ${customMedia.between("mobile", "baseline2")`
        width: 50%;
    `};
    ${customMedia.lessThan("mobile")`
        width: 100%;
    `};
`

export const Document = styled(Card)`
    width: 280px;
    height: 100%;
`

export const DocumentTitle = styled.div`
    padding-top: 16px;
    text-align: center;
`

export const Search = styled.div`
    width: 80%;
    margin: 30px auto 0;
`

export const GridItem = styled(Grid)`
    padding: 16px 8px;
`

export const NotePMImg = styled(CardMedia)`
    width: 140px;
    height: 140px;
    margin: 0 auto;
`

export const Buttons = styled(Grid)`
    margin-bottom: 24px;
    margin-top: 16px;
    display: flex;
    justify-content: center;
    ${customMedia.lessThan("mobile")`
        display: block;
        text-align: center;
    `};
`

export const Documents = styled(Box)`
    display: flex;
    flex-wrap: wrap;
`
