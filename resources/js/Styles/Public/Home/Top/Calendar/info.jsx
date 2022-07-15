import styled from 'styled-components';
import { generateMedia } from "styled-media-query";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';

const customMedia = generateMedia({ mobile: `940px`, });

export const TableHead = styled(TableCell)`
    &&& {
        min-width: 150px;
        font-weight: bold;
        font-size: 18px
    }
`

export const TableData = styled(TableCell)`
    &&& { font-size: 18px; }
`

export const StyleLink = styled.a`
    color: #2196f3;
    margin-left: 0;
`

export const WarningMessage = styled.div`
    padding: 8px 0 20px 10%;
    font-size: 18px;
`

export const StyleTable = styled(Table)`
    margin: 0 auto;
    padding-bottom: 20px;
    &&& {
        width: 100%;
        ${customMedia.lessThan("mobile")`
            width: 80%;
        `};
    }
`
