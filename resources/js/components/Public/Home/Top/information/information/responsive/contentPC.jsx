import React from "react";
import Weather from "../../weather";
import { GridContent, GridItem } from "@/Styles/Public/Home/Top/Information/content";

/**
 * PC版お知らせ
 */
const contentPC = ({ list }) => {
    return (
        <React.Fragment>
            <GridContent container>
                <GridItem scroll="scroll" item>
                    {list}
                </GridItem>
                <GridItem item>
                    <Weather />
                </GridItem>
            </GridContent>
        </React.Fragment>
    );
};

export default contentPC;
