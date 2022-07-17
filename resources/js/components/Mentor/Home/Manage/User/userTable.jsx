import React from 'react';
import Paginate from "@mui/material/Pagination";
import DeleteConfirmModal from '@/Components/Public/Home/modal/deleteConfirm';
import StudentTableBody from './table/studentTableBody';
import StaffTableBody from './table/staffTableBody';
import TableBody from '@mui/material/TableBody';
import TableHead from './table/tableHeadPart';
import { StyleTable, TableArea } from '@/Styles/Mentor/Home/Manage/User/userIndex';
import { Pagination } from '@/Styles/Mentor/Home/QA/ForMentorContent';
import { useUsers } from '@/Logics/Mentor/Home/Manage/User/userIndex';

/**
 * ユーザー一覧
 */
const userTable = ({ users, account, type, setStudents, setStaffs }) => {
    const [{ passNumber, open, setOpen }, { revealPass, handleOpen, deleteUser, unlockUser, handlePageClick, handlePageClickStudent }] = useUsers({ setStaffs, setStudents });

    const tableBody = type == "student" ?
        <StudentTableBody
            users={users}
            unlockUser={unlockUser}
            account={account}
            handleOpen={handleOpen}
            revealPass={revealPass}
            passNumber={passNumber}
        />
    :
        <StaffTableBody
            users={users}
            unlockUser={unlockUser}
            account={account}
            handleOpen={handleOpen}
        />

    return (
        <React.Fragment>
            <DeleteConfirmModal open={open} setOpen={setOpen} delete={deleteUser} />

            <TableArea>
                <StyleTable>
                    <TableHead account={account} type={type} />
                    <TableBody>{tableBody}</TableBody>
                </StyleTable>
            </TableArea>
            <Pagination>
                <Paginate
                    count={users.lastPage}
                    page={users.currentPage}
                    onChange={(type == 'staff') ? handlePageClick : handlePageClickStudent}
                    display="block"
                />
            </Pagination>
        </React.Fragment>
    );
};

export default userTable;
