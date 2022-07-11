import React from "react";
import Weather from "../../weather";
import { Heading, GridContent } from "@/Styles/Public/Home/Top/Information/content";

/**
 * モバイル版お知らせ
 */
const contentMobile = ({ list }) => {
    return (
        <GridContent scroll="scroll">
            {list}
            <Heading>天気情報</Heading>
            <Weather />
        </GridContent>
    );
};

export default contentMobile;
