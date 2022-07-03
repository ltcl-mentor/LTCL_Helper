import React from "react";
import Information from "./Information/information";
import Clendar from "./Calendar/calendar";
import { Modals } from "../modal";
import { useGetHomeData } from "@/Logics/Home/Top/Top";

const styleFooter = {
    backgroundColor: "#b39ddb",
    paddingTop: "16px"
};

/**
 * top画面
 */
const Top = (user) => {
    const [{ zoomLink, events, isWide, footerContent, open, type }, handleClose] = useGetHomeData();

    return (
        <React.Fragment>
            <Modals open={open} type={type} handleClose={handleClose} />

            {/* 校舎情報 */}
            {/* <Clendar zoomLink={zoomLink} /> */}

            {/* お知らせと天気 */}
            {/* <Information
                isAdmin={user.is_admin}
                events={events}
                isWide={isWide}
            /> */}

            {/* お問い合わせと校舎住所 */}
            {/* <div style={styleFooter}>{footerContent}</div> */}
        </React.Fragment>
    );
};

export default Top;
