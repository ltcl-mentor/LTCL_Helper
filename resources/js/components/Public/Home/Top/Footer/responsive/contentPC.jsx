import React from 'react';
import Location from '../location';
import { LogoImage } from '@/Styles/Common/Header';
import { StyleGrid, GridItem, Contact } from '@/Styles/Public/Home/Top/Footer/content';

/**
 * PC版フッター
 */
const contentPC = ({ mapKey, handleOpen }) => {
    return (
        <StyleGrid container>
            <GridItem item>
                {/*.ロゴ */}
                <div>
                    <LogoImage src="/images/helper_logo.png" />
                </div>

                {/*.お問い合せ */}
                <Contact onClick={() => handleOpen('contact')}>
                    お問い合わせ
                </Contact>
            </GridItem>
            <GridItem item>
                <Location mapKey={mapKey} />
            </GridItem>
        </StyleGrid>
    );
};

export default contentPC;
