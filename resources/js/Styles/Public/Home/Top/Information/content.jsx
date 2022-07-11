import styled from 'styled-components';
import { generateMedia } from "styled-media-query";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import ListSubheader from "@mui/material/ListSubheader";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from '@mui/icons-material/Delete';
import BreakingPoint from "@/Styles/BreakingPoint";

const customMedia = generateMedia({ mobile: `${BreakingPoint}px`, });

export const GridItem = styled(Grid)`
    width: 50%;
    overflow-y: ${(props) => props.scroll};
`

export const StyleUl = styled.ul`
    padding-left: 16px;
`

export const StyleListItem = styled(ListItem)`
    &&& { padding: 0; }
`

export const GridContent = styled(Grid)`
    margin: 0 auto;
    overflow-y: ${(props) => props.scroll};
    &&& {
        ${customMedia.lessThan("mobile")`
            width: 90%;
        `};
        ${customMedia.greaterThan("mobile")`
            width: 80%;
        `};
    }
`

export const StyleList = styled(List)`
    background-color: white;
    position: relative;
    over-flow: auto;
    height: 300px;
    &:ul {
        padding: 0
    }
    ${customMedia.lessThan("mobile")`
        width: 100%;
        overflow-y: scroll;
    `};
    ${customMedia.greaterThan("mobile")`
        width: 80%;
    `};
`

export const Date = styled(ListSubheader)`
    &&& {
        padding-left: 0;
        line-height: 16px;
    }
    padding-top: 8px;
`

export const NoInfo = styled.div`
    padding-left: 5%;
    padding-bottom: 12px;
    padding-top: 4px;
    font-size: 20px;
`

export const Heading = styled.div`
    color: #771AF8;
    font-weight: bold;
    font-size: 24px;
    padding-left: 6%;
`

export const StyleListItemText = styled(ListItemText)`
    cursor: pointer;
`

export const StyleDeleteIcon = styled(DeleteIcon)`
    cursor: pointer;
`
