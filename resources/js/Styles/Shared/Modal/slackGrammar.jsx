import styled from "styled-components";
import { generateMedia } from "styled-media-query";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BreakingPoint from "@/Styles/BreakingPoint";

const customMedia = generateMedia({ mobile: `${BreakingPoint}px`, });

export const Link = styled.a`
    text-decoration: underline;
    margin: 0;
`

export const Content = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 2px solid #000;
    box-shadow: 24;
    padding: 32px;
    width: 50%;
    ${customMedia.lessThan("mobile")`
        width: 90%;
    `};
`

export const SubHeading = styled.h3`
    text-align: center;
    margin-bottom: 24px;
    font-size: 1.2rem;
`

export const ButtonArea = styled.div`
    text-align: center;
    padding-top: 16px;
`

export const BackButton = styled(Button)`
    &&& {
        color: #771AF8;
        border: 1px solid #771AF8;
        font-weight: bold;
        &:hover {
            background-color: #771AF8;
            color: white;
        }
    }
`
