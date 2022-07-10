import React, { useState, useCallback } from "react";
import { useGetInfo } from "./getInfo";

// Topのロジック
export const useGetHomeData = () => {
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

    return [{ zoomLink, open, type, mapKey }, { handleOpen, handleClose }];
};
