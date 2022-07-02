import React from 'react';

import Header from '@/Layouts/Header';
import TabPanel from '@/Components/Public/Home/tabPanel';

/**
 * ホーム画面
 */
const Home = ({ auth }) => {
    return (
        <Header auth={auth}>
            {/* <TabPanel auth={auth}/> */}
        </Header>
    );
}

export default Home;
