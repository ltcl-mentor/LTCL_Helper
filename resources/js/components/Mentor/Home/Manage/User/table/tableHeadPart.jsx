import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableHeadCell } from '@/Styles/Mentor/Home/Manage/User/userIndex';

/**
 * TableHead
 */
const tableHeadPart = ({ account, type }) => {
    return (
        <TableHead>
            <TableRow>
                <TableHeadCell>ID</TableHeadCell>
                <TableHeadCell>名前</TableHeadCell>
                {type == "student" &&
                    <React.Fragment>
                        <TableHeadCell>受講生ID</TableHeadCell>
                        <TableHeadCell>パスワード</TableHeadCell>
                    </React.Fragment>
                }
                {account &&
                    <React.Fragment>
                        <TableHeadCell>ステータス</TableHeadCell>
                        <TableHeadCell>削除</TableHeadCell>
                    </React.Fragment>
                }
            </TableRow>
        </TableHead>
    );
};

export default tableHeadPart;
