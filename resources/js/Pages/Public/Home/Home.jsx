import React from 'react';
import Header from '@/Layouts/Header';

// ホーム画面
const Home = ({ auth }) => {
    return (
        <Header auth={auth}>
            <h1>Hello world!</h1>
        </Header>
    );
}

export default Home;
