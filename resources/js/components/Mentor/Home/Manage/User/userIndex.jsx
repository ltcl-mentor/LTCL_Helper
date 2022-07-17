import React from "react";
import { a11yProps } from "@/Components/Shared/a11yProps";
import UserTable from "./userTable";
import { StyleTabs, StyleTab, StyleTabArea } from "@/Styles/Public/Home/QA/Index/indexQuestionArticle";
import { Heading, AddLink, NoExist, Users } from "@/Styles/Mentor/Home/Manage/Manage";
import { useManage } from "@/Logics/Mentor/Home/Manage/Manage";

/**
 * ユーザー一覧
 */
const userIndex = ({ value, isMaster, setStudents, setStaffs, handleOpen, handleChange }) => {
    const [{ students, staffs }] = useManage({ setStaffs, setStudents });

    const component = value == 0 ? (
        students.eventList.length !== 0 ?
            <UserTable
                users={students}
                account={isMaster}
                type="student"
                setStudents={setStudents}
                setStaffs={setStaffs}
            />
        :
            <NoExist>登録されている受講生はいません。</NoExist>
    ) : (
        staffs.eventList.length > 0 ?
            <UserTable
                users={staffs}
                account={isMaster}
                type="staff"
                setStudents={setStudents}
                setStaffs={setStaffs}
            />
        :
            <NoExist>登録されているスタッフはいません。</NoExist>
    )

    return (
        <React.Fragment>
            <Heading>ユーザー一覧</Heading>
            <AddLink onClick={() => handleOpen("user")}>
                イベント追加
            </AddLink>
            <Users>
                <StyleTabArea>
                    <StyleTabs value={value} onChange={handleChange}>
                        <StyleTab label="受講生" {...a11yProps(0)} />
                        <StyleTab label="管理者" {...a11yProps(1)} />
                    </StyleTabs>
                </StyleTabArea>
                {component}
            </Users>
        </React.Fragment>
    );
};

export default userIndex;
