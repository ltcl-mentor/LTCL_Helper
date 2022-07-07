import styled from 'styled-components';
import Button from "@mui/material/Button";

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
