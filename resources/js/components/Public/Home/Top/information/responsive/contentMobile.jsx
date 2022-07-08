import React from "react";
import Weather from "../weather";
import { Heading, GridContent } from "@/Styles/Public/Home/Top/Information/content";

/**
 * モバイル版お知らせ
 */
const contentMobile = ({ list }) => {
    return (
        <GridContent>
            {list}
            <Heading>天気情報</Heading>
            <Weather isWide={false} />
        </GridContent>
    );
};

export default contentMobile;
