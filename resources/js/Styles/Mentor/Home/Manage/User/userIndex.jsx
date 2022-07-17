import style from 'styled-components';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
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
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    textAlign: "center",
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export const TableArea = style(Paper)`
    width: 90%;
    margin: 0 auto;
`

export const StyleTable = style(Table)`
    min-width: 630px;
`

export const TableHeadCell = styled(StyledTableCell)`
    font-weight: bold;
`
