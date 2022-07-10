import React from "react";
import { Modals } from "../../../modal";
import { useInfoContent } from "@/Logics/Home/Top/Information/content";

/**
 * お知らせコンテンツ
 */
const content = ({ isAdmin, dates, infos, handleDelete, setDeleteInfo, deleteOpen, setDeleteOpen, isWide }) => {
    const [{responsive, showOpen, showInfo}, handleShowClose] = useInfoContent({ isAdmin, dates, infos, setDeleteInfo, setDeleteOpen, isWide });

    return (
        <React.Fragment>
            <Modals
                open={showOpen}
                type={"show_info"}
                handleClose={handleShowClose}
                info={showInfo}
            />

            <Modals
                open={deleteOpen}
                type={"delete_info"}
                setOpen={setDeleteOpen}
                delete={handleDelete}
            />

            {responsive}
        </React.Fragment>
    );
};

export default content;
