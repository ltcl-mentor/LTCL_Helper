import React, { useState, useCallback } from "react";
import useMedia from "use-media";
import ContentMobile from "@/Components/Public/Home/Top/Footer/contentMobile";
import ContentPC from  "@/Components/Public/Home/Top/Footer/contentPC";
import BreakingPoint from "@/Styles/BreakingPoint";
import { useGetInfo } from "./getInfo";

// Topのロジック
export const useGetHomeData = () => {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("user");
    const [mapKey, setMapKey] = useState();
    const [zoomLink, setZoomLink] = useState();
    useGetInfo({ setMapKey, setZoomLink });

    // モーダル開閉
    const handleOpen = useCallback(type => {
        setOpen(true);
        setType(type);
    });
    const handleClose = useCallback(() => {
        setOpen(false);
        setType("user");
    });

    const footerContent = isWide ?
        <ContentPC mapKey={mapKey} handleOpen={handleOpen} /> :
        <ContentMobile mapKey={mapKey} handleOpen={handleOpen} />

    return [{ zoomLink, isWide, footerContent, open, type }, handleClose];
};
