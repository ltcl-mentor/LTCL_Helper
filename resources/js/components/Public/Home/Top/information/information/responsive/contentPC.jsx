import React from "react";
import useMedia from "use-media";
import Weather from "../../weather";
import { GridContent, GridItem } from "@/Styles/Public/Home/Top/Information/content";
import BreakingPoint from "@/Styles/BreakingPoint";

/**
 * PC版お知らせ
 */
const contentPC = ({ list }) => {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    return (
        <React.Fragment>
            <GridContent isWide={isWide} container>
                <GridItem item>
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
