import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import useMedia from "use-media";
import ContentMobile from "@/Components/Public/Home/Top/Footer/contentMobile";
import ContentPC from  "@/Components/Public/Home/Top/Footer/contentPC";
import BreakingPoint from "@/Styles/BreakingPoint";

// Topのロジック
export const useGetHomeData = () => {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("user");
    const [mapKey, setMapKey] = useState();
    const [zoomLink, setZoomLink] = useState();
    const [events, setEvents] = useState([]);

    // モーダル開閉
    const handleOpen = useCallback(type => {
        setOpen(true);
        setType(type);
    });
    const handleClose = useCallback(() => {
        setOpen(false);
        setType("user");
    });

    // マップのAPIキー、Zoomのリンク一覧へのURL、イベント一覧
    useEffect(() => {
        const getHomeData = async () => {
            const res = await axios.get(route('getData.home'));
            setMapKey(res.data.key);
            setZoomLink(res.data.zoom);
            setEvents(res.data.events);
        };
        getHomeData();
    }, []);

    const footerContent = isWide ?
        <ContentPC mapKey={mapKey} handleOpen={handleOpen} /> :
        <ContentMobile mapKey={mapKey} handleOpen={handleOpen} />

    return [{ zoomLink, events, isWide, footerContent, open, type }, handleClose];
};
