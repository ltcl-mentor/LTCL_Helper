import React from "react";
import EventsIndex from "./Event/eventsIndex";
import MasterIndex from "./Master/masterIndex";
import UserIndex from "./User/userIndex";
import { Modals } from "../../../Public/Home/modal";
import { StyleContent } from "@/Styles/Mentor/Home/Manage/Manage";
import { useManage } from "@/Logics/Mentor/Home/Manage/Manage";

/**
 * 管理
 */
const Manage = ({ user }) => {
    const isMaster = user.id == 1 && user.name == "master" && user.is_admin == "staff";
    const [
        { open, type, event, value, events, setStaffs, setStudents, setEvents },
        { handleOpen, handleClose, clickEvent, backupQuestion, backupStudent, handleChange }
    ] = useManage();

    return (
        <StyleContent>
            <Modals
                open={open}
                type={type}
                handleClose={handleClose}
                setStaffs={setStaffs}
                setStudents={setStudents}
                event={event}
                value={value}
                setEvents={setEvents}
            />

            {/* イベント一覧 */}
            <EventsIndex
                events={events}
                clickEvent={clickEvent}
                handleOpen={handleOpen}
            />

            {/* master限定機能 */}
            {isMaster &&
                <React.Fragment>
                    <MasterIndex backupStudent={backupStudent} backupQuestion={backupQuestion} />
                </React.Fragment>
            }

            {/* ユーザー一覧 */}
            <UserIndex
                value={value}
                isMaster={isMaster}
                setStudents={setStudents}
                setStaffs={setStaffs}
                handleOpen={handleOpen}
                handleChange={handleChange}
            />
        </StyleContent>
    );
};

export default Manage;
