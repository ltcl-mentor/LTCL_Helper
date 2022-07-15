import styled from 'styled-components';
import { generateMedia } from "styled-media-query";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import { PurpleButton, WhiteButton } from '@/Styles/Shared/Button';
import BreakingPoint from "@/Styles/BreakingPoint";

const customMedia = generateMedia({ mobile: `${BreakingPoint}px`, });

export const Explain = styled(Card)`
    width: 90%;
    margin: 5% auto;
    padding: 20px 0;
    &&& {
        background-color: #ECE9E9;
    }
`

export const ExplainText = styled.div`
    text-align: left;
    max-width: 565px;
    width: 80%;
    margin: 0 auto;
`

export const Bold = styled.span`
    font-weight: bold;
`

export const RadioButtons = styled.div`
    width: 220px;
    margin: 0 auto;
`

export const CustomPurpleButton = styled(PurpleButton)`
    width: 135px;
`

export const CustomWhiteButton = styled(WhiteButton)`
    width: 135px;
`

export const StyleGrid = styled(Grid)`
    &&& { width: 85%; }
    margin: 0 auto 40px;
`

export const GridItem = styled(Grid)`
    flex: 1;
`

export const SearchArea = styled(Card)`
    padding: 4px;
    display: flex;
    align-items: center;
    ${customMedia.lessThan("mobile")`
        width: 90%;
        margin: 20px auto;
        font-size: 18px;
    `};
`

export const StyleInputBase = styled(InputBase)`
    margin-left: 4px;
    flex: 1;
`

export const SearchButton = styled(Button)`
    &&& {
        background-color: #771AF8;
        color: white;
        min-width: 30px;
    }
    height: 100%;
    width: 40px;
    &:hover {
        background-color: #6633CC;
    }
`

export const Empty = styled.div`
    text-align: center;
    padding-bottom: 20px;
`

export const SearchResult = styled(Card)`
    margin: 16px auto;
    width: 90%;
    padding: 0;
`

export const PaginationArea = styled(Grid)`
    justify-content: center;
    margin-top: 4px;
    margin-bottom: 8px;
`
