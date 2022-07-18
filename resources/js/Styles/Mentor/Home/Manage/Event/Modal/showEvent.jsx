import styled from "styled-components";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { ModalSubHeading } from '@/Styles/Shared/Modal/modal';

export const Content = styled(Box)`
    width: 80%;
    margin: 50px auto 0;
`

export const StyleTextField = styled(TextField)`
    &&& {
        margin: 20px 0;
        width: 100%;
    }
`

export const StyleLink = styled(Button)`
    width: 25px;
    &&& {
        text-decoration: underline;
        padding: 0;
        font-size: 18px;
        color: ${(props) => (props.red ? props.red : "#771AF8")};
    }
`

export const SubHeading = styled(ModalSubHeading)`
    margin: 0;
`
