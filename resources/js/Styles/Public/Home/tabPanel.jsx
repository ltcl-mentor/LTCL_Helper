import styled from 'styled-components';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export const StyledBox = styled(Box)`
    width: 100%;
`

export const StyledTabArea = styled(Box)`
    border-bottom: 4px;
    border-color: white;
    padding-left: 10%;
`

export const StyledTabs = styled(Tabs)`
    color: #771AF8;
`

export const StyledTab = styled(Tab)`
    &&& { color: #771AF8; }
    font-size: 24px;
`
