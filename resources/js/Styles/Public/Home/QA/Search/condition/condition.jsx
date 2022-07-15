import styled from 'styled-components';
import { generateMedia } from "styled-media-query";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from "@mui/material/Stack";
import { PurpleButton, WhiteButton } from '@/Styles/Shared/Button';
import BreakingPoint from "@/Styles/BreakingPoint";

const customMedia = generateMedia({ mobile: `${BreakingPoint}px`, });

export const CustomPurpleButton = styled(PurpleButton)`
    width: 135px;
`

export const CustomWhiteButton = styled(WhiteButton)`
    width: 135px;
`

export const StyleDiv = styled.div`
    margin: 25px 30px 10px;
    ${customMedia.lessThan("mobile")`
        margin: 13px 15px 5px;
    `};
`

export const Buttons = styled(Stack)`
    width: 100%;
    margin: 0;
`

export const Heading = styled.div`
    font-weight: bold;
    font-size: 20px;
    margin-top: 24px;
`

export const Warning = styled.span`
    font-weight: normal;
    color: #771AF8;
    font-size: 16px;
    ${customMedia.greaterThan("mobile")`
        margin-left: 20px;
        font-size: 18px;
    `};
`

export const StyleBox = styled(Box)`
    text-align: left;
    margin-top: 4px;
    margin-bottom: 12px;
`

export const ResultArea = styled(Card)`
    margin-bottom: 12px;
`

export const ResultHeading = styled.div`
    &&& { margin: 12px; }
    border-bottom: 1px solid #d3c8c8;
`

export const ResultQuestion = styled(Box)`
    width: 90%;
    margin: 0 auto;
`
