import styled from "styled-components";
import { generateMedia } from "styled-media-query";
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BreakingPoint from "@/Styles/BreakingPoint";

const customMedia = generateMedia({
    mobile: `${BreakingPoint}px`,
});

export const Text = styled.div`
    height: 20px;
    margin-top: 8px;
`

export const GridItem = styled(Grid)`
    flex-grow: ${(props) => (props.grow == "1" ? 1 : 3)};
`

export const Selects = styled(Select)`
    width: 90%;
    background-color: white;
`

export const StyleCard = styled(Card)`
    &&& {
        box-shadow: none;
        background-color: #ECE9E9;
    }
    margin: 40px auto;
    padding: 10px;
    width: 90%;
`

export const Form = styled(FormControl)`
    width: ${(props) => (props.width && `${props.width}%`)};
    ${customMedia.lessThan("mobile")`
        width: 100%;
        display: block;
    `};
`

export const ErrorMessage = styled.div`
    text-align: center;
    color: red;
    font-size: 18px;
    margin-top: 10px;
`

export const StyleBox = styled(Box)`
    width: 70%;
    margin-left: 15%;
`
