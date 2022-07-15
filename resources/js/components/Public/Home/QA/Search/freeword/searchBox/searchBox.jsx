import React from 'react';
import useMedia from "use-media";
import ContentPC from './contentPC';
import ContentMobile from './contentMobile';
import BreakingPoint from "@/Styles/BreakingPoint";

/**
 * 検索フォーム
 */
const searchBox = ({ handleFreeword }) => {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    const searchField = isWide ?
        <ContentPC handleFreeword={handleFreeword} />
    :
        <ContentMobile handleFreeword={handleFreeword} />

    return (
        <React.Fragment>
            {searchField}
        </React.Fragment>
    );
};

export default searchBox;
