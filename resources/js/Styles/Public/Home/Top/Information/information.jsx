import styled from 'styled-components';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export const StyleDiv = styled.div`
    padding: 16px 0;
`

export const Heading = styled.div`
    color: #771AF8;
    font-weight: bold;
    &&& {
        font-size: 24px;
        padding-left: 10%;
    }
`

export const AddInfoButton = styled(Button)`
    &&& {
        vertical-align: top;
        color: #771AF8;
        &:hover {
            background-color: white;
            text-decoration: underline;
        }
    }
`

export const Gray = styled.div`
    ${(props) => `text-align: ${props.align}`};
    ${(props) => props.break && `wordBreak: break-word`};
    font-size: 16px;
    line-height: 1.5;
    color: gray;
    margin-top: 8px;
`

export const Black = styled(Gray)`
    color: black;
`

export const StyleBox = styled(Box)`
    width: 85%;
    margin: 30px auto 0;
`
