import React from "react";
import useMedia from "use-media";
import { useGetHomeData } from "@/Logics/Public/Home/Top/Top";
import Calendar from "./Calendar/calendar";
import ContentMobile from "./Footer/responsive/contentMobile";
import ContentPC from  "./Footer/responsive/contentPC";
import Information from "./Information/information";
import { Modals } from "../modal";
import { FooterContent } from "@/Styles/Public/Home/HomeContent";
import BreakingPoint from "@/Styles/BreakingPoint";

/**
 * top画面
 */
const Top = ({ user }) => {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    const [{ zoomLink, open, type, mapKey }, { handleOpen, handleClose }] = useGetHomeData();
    const footerContent = isWide ?
        <ContentPC mapKey={mapKey} handleOpen={handleOpen} />
    :
        <ContentMobile mapKey={mapKey} handleOpen={handleOpen} />

    return (
        <React.Fragment>
            <Modals
                open={open}
                type={type}
                handleClose={handleClose}
            />

            {/* 校舎情報 */}
            <Calendar zoomLink={zoomLink} />

            {/* お知らせと天気 */}
            <Information isAdmin={user.is_admin} />

            {/* お問い合わせと校舎住所 */}
            <FooterContent>{footerContent}</FooterContent>
        </React.Fragment>
    );
};

export default Top;
