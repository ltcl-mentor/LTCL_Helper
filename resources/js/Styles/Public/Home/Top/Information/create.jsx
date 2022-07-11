import styled from 'styled-components';
import { generateMedia } from "styled-media-query";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import BreakingPoint from "@/Styles/BreakingPoint";

const customMedia = generateMedia({ mobile: `${BreakingPoint}px`, });

export const ValidationMessage = styled.div`
    color: red;
    text-align: center;
    line-height: 1.5;
    font-size: 16px;
    padding-top: 8px;
`

export const Warning = styled.div`
    color: red;
    font-size: 14px;
    ${customMedia.greaterThan("mobile")`
        display: inline;
        padding-left: 4px;
    `};
`

export const WordCount = styled.div`
    text-align: right;
    font-size: 13px;
`

export const ReleaseDate = styled.div`
    margin-top: 16px;
`

export const Template = styled.div`
    font-size: 16px;
    margin: 8px 0;
`

export const StyleBox = styled(Box)`
    width: 80%;
    margin: 50px auto 0;
`

export const StyleTextField = styled(TextField)`
    width: 100%;
    margin-top: 4px;
`

export const StyleResponsiveTextField = styled(TextField)`
    margin-top: 16px;

    ${customMedia.lessThan("mobile")`
        width: 100%;
    `};
    ${customMedia.greaterThan("mobile")`
        width: 50%;
    `};
`

export const StyleFormControlLabel = styled(FormControlLabel)`
    width: 100%;
    margin-top: 4px;
`

export const SubHeading = styled.div`
    color: #666666;
    font-size: 20px;
    font-weight: bold;
    ${customMedia.greaterThan("mobile")`
        display: inline;
    `};
`

export const AutoInputButton = styled(Button)`
    display: block;
    height: 100%;
    margin: 0 auto;
`
export const StyleDiv = styled.div`
    ${customMedia.lessThan("mobile")`
        width: 100%;
    `};
    ${customMedia.greaterThan("mobile")`
        width: 50%;
    `};
`

export const StyleFlex = styled.div`
    ${customMedia.greaterThan("mobile")`
        display: flex;
    `};
`

export const StyleChip = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5;
`

export const StyleFormControl = styled(FormControl)`
    ${customMedia.lessThan("mobile")`
    width: 100%;
    `};
    ${customMedia.greaterThan("mobile")`
    width: 50%;
    `};
`
