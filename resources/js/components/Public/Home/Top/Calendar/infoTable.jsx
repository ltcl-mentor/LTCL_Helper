import React from 'react';
import useMedia from 'use-media';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { StyleLink, StyleTable, TableData, TableHead } from '@/Styles/Public/Home/Top/Calendar/info';

/**
 * 校舎情報テーブル
 */
const infoTable = ({ collegeInfo, zoomLink }) => {
    const isWide = useMedia({ minWidth: '940px' });
    return (
        <StyleTable isWide={isWide}>
            <TableBody>
                <TableRow key='time'>
                    <TableHead>開校時間</TableHead>
                    <TableData>{ collegeInfo.start } 〜 { collegeInfo.close }</TableData>
                </TableRow>

                {collegeInfo.staff[0] &&
                    <TableRow key='college'>
                        <TableHead>出勤メンター<br/>(校舎)</TableHead>
                        <TableData>
                            {collegeInfo.staff.map((staff) => (
                                <div key={staff}>{staff}</div>
                            ))}
                        </TableData>
                    </TableRow>
                }

                {collegeInfo.online_staff[0] &&
                    <TableRow key='online_college'>
                        <TableHead>出勤メンター<br/>(オンライン)</TableHead>
                        <TableData>
                            {collegeInfo.online_staff.map((staff) => (
                                <div key={staff}>{staff}</div>
                            ))}
                        </TableData>
                    </TableRow>
                }

                <TableRow key='zoom'>
                    <TableHead>オンライン<br/>質問部屋</TableHead>
                    <TableData>
                        <div>{collegeInfo.zoom.message}</div>
                    </TableData>
                </TableRow>

                <TableRow key='profile'>
                    <TableHead>メンター<br/>プロフィール</TableHead>
                    <TableData>
                        <StyleLink href={ zoomLink } target="_blank">
                            メンタープロフィール
                        </StyleLink>
                    </TableData>
                </TableRow>
            </TableBody>
        </StyleTable>
    );
};

export default infoTable;
