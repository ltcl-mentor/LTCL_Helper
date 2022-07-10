import React from "react";
import Weather from "../../weather";
import { GridContent, GridItem } from "@/Styles/Public/Home/Top/Information/content";

/**
 * PC版お知らせ
 */
const contentPC = ({ isWide, list }) => {
    return (
        <React.Fragment>
            <GridContent isWide={isWide} container>
                <GridItem item>
                    {list}
                </GridItem>
                <GridItem item>
                    <Weather isWide={true} />
                </GridItem>
            </GridContent>
        </React.Fragment>
    );
};

export default contentPC;
