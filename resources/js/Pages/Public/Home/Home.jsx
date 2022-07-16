import React from 'react';
import Header from '@/Components/Shared/Header/Header';
import HomeContent from '@/Components/Public/Home/Home';

/**
 * ホーム画面
 */
const Home = ({ auth }) => {
    return (
        <Header auth={auth}>
            <HomeContent auth={auth} />
        </Header>
    );
}

export default Home;
