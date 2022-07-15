import styled from 'styled-components';
import Box from '@mui/material/Box';
import { StyledTabs, StyledTab } from '../../tabPanel';

export const Heading = styled.div`
    color: #771AF8;
    font-weight: bold;
    font-size: 24px;
`

export const StyleDiv = styled.div`
    width: 90%;
    margin: 32px auto 0;
`

export const StyleTabArea = styled(Box)`
    width: 100%;
    margin-top: 6px;
`

export const StyleTabs = styled(StyledTabs)`
    margin-bottom: 12px;
`

export const StyleTab = styled(StyledTab)`
    &&& {
        font-size: 20px;
        font-weight: bold;
    }
`
