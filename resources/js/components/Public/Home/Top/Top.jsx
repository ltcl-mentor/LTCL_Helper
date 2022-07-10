import React from "react";
import useMedia from "use-media";
import { useGetHomeData } from "@/Logics/Home/Top/Top";
import Calendar from "./Calendar/calendar";
import ContentMobile from "./Footer/contentMobile";
import ContentPC from  "./Footer/contentPC";
import Information from "./Information/information";
import { Modals } from "../modal";
import BreakingPoint from "@/Styles/BreakingPoint";

const styleFooter = {
    backgroundColor: "#b39ddb",
    paddingTop: "16px"
};

/**
 * top画面
 */
const Top = ({ user }) => {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    const [{ zoomLink, open, type, mapKey }, {handleOpen, handleClose }] = useGetHomeData();
    const footerContent = isWide ?
        <ContentPC mapKey={mapKey} handleOpen={handleOpen} />
    :
        <ContentMobile mapKey={mapKey} handleOpen={handleOpen} />

    return (
        <React.Fragment>
            <Modals open={open} type={type} handleClose={handleClose} />

            {/* 校舎情報 */}
            <Calendar zoomLink={zoomLink} />

            {/* お知らせと天気 */}
            <Information isAdmin={user.is_admin} isWide={isWide} />

            {/* お問い合わせと校舎住所 */}
            {/* <div style={styleFooter}>{footerContent}</div> */}
        </React.Fragment>
    );
};

export default Top;
