import styled from 'styled-components';
import { styled as style } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

export const StyledTableCell = style(TableCell)(({ theme }) => ({
    textAlign: "center",
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#C299FF',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: '#EEEEEE',
        fontSize: 14,
    },
}));
export const StyledTableRow = style(TableRow)(({ theme }) => ({
    textAlign: "center",
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const TableArea = styled(Paper)`
    width: 90%;
    margin: 0 auto;
    overflow-x: scroll;
`

export const StyleTable = styled(Table)`
    min-width: 630px;
`

export const TableHeadCell = styled(StyledTableCell)`
    font-weight: bold;
`
