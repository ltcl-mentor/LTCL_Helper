import React from "react";
import Location from "../location";
import { LogoImage } from '@/Styles/Common/Header';
import { StyleDiv, Contact } from '@/Styles/Public/Home/Top/Footer/content';

/**
 * モバイル版フッター
 */
const contentMobile = ({ mapKey, handleOpen }) => {
    return (
        <StyleDiv>
            {/*.ロゴ */}
            <div>
                <LogoImage src="/images/helper_logo.png" />
            </div>

            {/*.お問い合せ */}
            <Contact onClick={() => handleOpen('contact')}>
                お問い合わせ
            </Contact>
            <Location mapKey={mapKey} />
        </StyleDiv>
    );
};

export default contentMobile;
