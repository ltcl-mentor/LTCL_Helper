import React from "react";
import { StyleCard } from "@/Styles/Mentor/Home/Manage/User/userRegister/userRegister";
import Year from "./year";
import Month from './month';
import Number from "./number";

/**
 * 受講生登録の選択コンポーネント
 */
const userRegister = ({ select, handleSelect }) => {
    return (
        <StyleCard>
            <Year select={select} handleSelect={handleSelect} />
            <Month select={select} handleSelect={handleSelect} />
            <Number select={select} handleSelect={handleSelect} />
        </StyleCard>
    );
};

export default userRegister;
