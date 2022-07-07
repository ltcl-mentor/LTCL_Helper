import styled from 'styled-components';
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import ListSubheader from "@mui/material/ListSubheader";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from '@mui/icons-material/Delete';

export const GridItem = styled(Grid)`
    width: 50%;
`

export const StyleUl = styled.ul`
    padding-left: 16px;
`

export const StyleListItem = styled(ListItem)`
    &&& { padding: 0; }
`

export const GridContent = styled(Grid)`
    &&& {width: ${props => props.isWide ? "80%" : "90%"}; }
    margin: 0 auto;
`

export const StyleList = styled(List)`
    width: ${props => props.isWide ? "80%" : "100%"};
    background-color: white;
    position: relative;
    over-flow: auto;
    height: 300px;
    &:ul {
        padding: 0
    }
`

export const Date = styled(ListSubheader)`
    &&& {
        padding-left: 0;
        line-height: 16px;
    }
    padding-top: 8px;
`

export const NoInfo = styled.div`
    padding-left: ${props => props.isWide && "5%"};
    padding-bottom: ${props => props.isWide && "12px"};
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
