import styled from 'styled-components';

export const BackImage = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url('/images/login_image.png');
`;

export const MiddleContent = styled.div`
    width: 13rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    -webkit- transform: translateY(-50%) translateX(-50%);
`

export const Welcome = styled.h1`
    font-size: 2.25rem;
    line-height: 2.5rem;
    text-align: center;
    color: #771AF8;
`
