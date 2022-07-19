import React, { useState } from "react";
import useMedia from "use-media";
import { useInfoContent } from "@/Logics/Public/Home/Top/Information/content";
import ContentPC from '@/Components/Public/Home/Top/Information/information/responsive/contentPC';
import ContentMobile from "@/Components/Public/Home/Top/Information/information/responsive/contentMobile";
import InfoList from "@/Components/Public/Home/Top/Information/information/infoList";
import { Modals } from "../../../modal";
import { NoInfo } from "@/Styles/Public/Home/Top/Information/content";
import BreakingPoint from "@/Styles/BreakingPoint";

/**
 * お知らせコンテンツ
 */
const content = ({ isAdmin, dates, infos, handleDelete, setDeleteInfo }) => {
    const isWide = useMedia({ minWidth: `${BreakingPoint}px` });
    const typeCheck = typeof infos !== ("undefined" || "null");
    const lengthCheck = dates.length !== 0;
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [{ showInfo, showOpen }, { selectDelete, handleShowClose, showInformation }] = useInfoContent({ setDeleteInfo, setDeleteOpen });

    const list = typeCheck && lengthCheck && dates.length === Object.keys(infos).length ?
        <InfoList
            isAdmin={isAdmin}
            dates={dates}
            infos={infos}
            selectDelete={selectDelete}
            showInformation={showInformation}
        />
    :
        <NoInfo isWide={isWide}>お知らせはありません。</NoInfo>

    const responsive = isWide ? <ContentPC list={list} /> : <ContentMobile list={list} />

    return (
        <React.Fragment>
            <Modals
                open={showOpen}
                type={"show_info"}
                handleClose={handleShowClose}
                info={showInfo}
                isAdmin={isAdmin}
            />

            <Modals
                open={deleteOpen}
                type={"delete_info"}
                setOpen={setDeleteOpen}
                deleted={handleDelete}
            />

            {responsive}
        </React.Fragment>
    );
};

export default content;
