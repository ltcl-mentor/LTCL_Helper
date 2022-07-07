import React from "react";
import Weather from "../weather";
import { Heading } from "@/Styles/Public/Home/Top/Information/content";

/**
 * モバイル版お知らせ
 */
const contentMobile = ({ list }) => {
    return (
        <React.Fragment>
            {list}
            <Heading>天気情報</Heading>
            <Weather isWide={false} />
        </React.Fragment>
    );
};

export default contentMobile;
