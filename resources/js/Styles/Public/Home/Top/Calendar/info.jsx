import styled from 'styled-components';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';

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
    &&& {width: ${props => props.isWide ? "100%" : "80%"}; }
    margin: 0 auto;
    padding-bottom: 20px;
`
