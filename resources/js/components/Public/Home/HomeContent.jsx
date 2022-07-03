import React from 'react';
import { Footer, StyledDiv } from '@/Styles/Public/Home/HomeContent';
import TabPanel from './tabPanel';
// import { useLocation } from 'react-router-dom';
// import '../../../../../public/css/Public/top.css';
// import Alert from '../../Alert';

/**
 * トップ画面の親コンポーネント
 */
const HomeContent = ({ auth }) => {
    // const parameter = useLocation();
    return (
        <StyledDiv>
            {/* アラート */}
            {/* <Alert
                type={ parameter.state && parameter.state.type }
                status={ parameter.state && parameter.state.status }
                info={ parameter.state && parameter.state.info }
            />
            {user.reply_count > 0 &&
                <Alert
                    type="info"
                    status="question"
                />
            } */}

            {/* タブ */}
            <TabPanel auth={auth} />

            <Footer>レバテックカレッジ</Footer>
        </StyledDiv>
    );
};

export default HomeContent;
