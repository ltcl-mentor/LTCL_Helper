import styled from "styled-components";
import { generateMedia } from "styled-media-query";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import { ModalSubHeading } from "@/Styles/Shared/Modal/modal";
import BreakingPoint from "@/Styles/BreakingPoint";

const customMedia = generateMedia({
    mobile: `${BreakingPoint}px`,
});

export const StyleTable = styled(Table)`
    width: 80%;
    margin: 10px auto 0;
`

export const TableHead = styled(TableCell)`
    width: 50%;
    &&& {
        color: #666666;
        border-bottom: white;
        font-weight: bold;
        font-size: 18px;
        vertical-align: center;
    }
`

export const TBody = styled(TableCell)`
    &&& { border-bottom: white; }
    width: 50%;
`

export const Warning = styled.div`
    color: red;
    margin-bottom: 8px;
    ${customMedia.lessThan("mobile")`
        text-align: center;
        margin-top: 10px;
    `};
`

export const SubHeading = styled(ModalSubHeading)`
    font-size: 18px;
`

export const StyleDiv = styled.div`
    width: 90%;
    margin: 0 auto;
`
