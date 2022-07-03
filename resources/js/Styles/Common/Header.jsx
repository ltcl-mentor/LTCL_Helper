import styled from 'styled-components';
import Button from '@/Components/Default/Button';

export const HeaderRight = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    height: 64px;
`
export const HeaderPosition = styled.div`
    margin-left: auto;
    margin-right: auto;
    padding-left: 16px;
    padding-right: 16px;
`
export const StyledSearchButton = styled(Button)`
    width: 6rem
    justify-content: center;
    height: 2.25rem;
`
export const LogoImage = styled.img`
    width: 160px;
    height: 48px;
`
export const Username = styled.span`
    font-size: 1.25rem;
    line-height: 1.75rem;
    text-align: middle;
`
