import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { StyledTableCell, StyledTableRow } from '@/Styles/Mentor/Home/Manage/User/userIndex';

/**
 * 受講生のTableBody
 */
const studentTableBody = ({ users, unlockUser, account, handleOpen, revealPass, passNumber }) => {
    return (
        <React.Fragment>
            {users.eventList.map((user, index) => {
                const lockButton = !user.lock ? '平常' :
                    <Button
                        variant="contained"
                        onClick={() => unlockUser(user.user_id)}
                    >
                        ロック解除
                    </Button>

                return (
                    <StyledTableRow key={user.id}>
                        <StyledTableCell>{user.user_id}</StyledTableCell>
                        <StyledTableCell>{user.student_name}</StyledTableCell>
                        <StyledTableCell>{user.name}</StyledTableCell>
                        <StyledTableCell>
                            <Button
                                variant="text"
                                onClick={() => revealPass(index)}
                            >
                                { passNumber === index ? user.password : 'パスワード' }
                            </Button>
                        </StyledTableCell>
                        {account &&
                            <React.Fragment>
                                <StyledTableCell>{lockButton}</StyledTableCell>
                                <StyledTableCell>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleOpen(user.user_id)}
                                        startIcon={ <DeleteIcon /> }
                                    >
                                        削除する
                                    </Button>
                                </StyledTableCell>
                            </React.Fragment>
                        }
                    </StyledTableRow>
                );
            })}
        </React.Fragment>
    );
};

export default studentTableBody;
