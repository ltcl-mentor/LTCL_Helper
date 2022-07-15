import styled from 'styled-components';
import { generateMedia } from "styled-media-query";
import Card from "@mui/material/Card";
import { PurpleButton, GrayButton } from '@/Styles/Shared/Button';
import BreakingPoint from "@/Styles/BreakingPoint";

const customMedia = generateMedia({ mobile: `${BreakingPoint}px`, });

export const StyleCard = styled(Card)`
    width: 80%;
    margin: 16px auto 0;
    padding: 0;
`

export const SearchPurpleButton = styled(PurpleButton)`
    height: 60px;
    line-height: 100%;
    &&& {
        font-size: 24px;
        border-radius: 0;
        ${customMedia.lessThan("mobile")`
            font-size: 16px;
        `};
    }
`

export const SearchGrayButton = styled(GrayButton)`
    height: 60px;
    line-height: 100%;
    &&& {
        font-size: 24px;
        border-radius: 0;
        ${customMedia.lessThan("mobile")`
            font-size: 16px;
        `};
    }
`
