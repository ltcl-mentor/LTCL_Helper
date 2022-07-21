import React from 'react';
import RankButton from '../document/rankButton';
import { Buttons } from '@/Styles/Public/Question/Index/Index/Index';

/**
 * ステータス選択ボタン
 */
const buttons = ({ rank, handleSelect }) => {
    return (
        <Buttons>
            <RankButton rank={rank.beginner} handleSelect={handleSelect}>
                初心者向け
            </RankButton>
            <RankButton rank={rank.amature} handleSelect={handleSelect}>
                中級者向け
            </RankButton>
            <RankButton rank={rank.master} handleSelect={handleSelect}>
                上級者向け
            </RankButton>
            <RankButton rank={rank.all} handleSelect={handleSelect}>
                全員向け
            </RankButton>
        </Buttons>
    );
}

export default buttons;
