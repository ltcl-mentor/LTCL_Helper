import React from 'react';

import Header from '@/Layouts/Header';
import HomeContent from '@/Components/Public/Home/HomeContent';

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
