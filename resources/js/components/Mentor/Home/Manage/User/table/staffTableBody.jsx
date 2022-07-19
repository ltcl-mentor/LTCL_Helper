import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { StyledTableCell, StyledTableRow } from '@/Styles/Mentor/Home/Manage/User/userIndex';

/**
 * 管理者のTableBody
 */
const staffTableBody = ({ users, unlockUser, account, handleOpen }) => {
    return (
        <React.Fragment>
            {users.eventList.map(user => {
                const lockButton = !user.lock ? '平常' :
                    <Button
                        variant="contained"
                        onClick={() => unlockUser(user.id)}
                    >
                        ロック解除
                    </Button>

                return (
                    <StyledTableRow key={user.id}>
                        <StyledTableCell>{user.id}</StyledTableCell>
                        <StyledTableCell>{user.name}</StyledTableCell>
                        {account &&
                            <React.Fragment>
                                <StyledTableCell>{lockButton}</StyledTableCell>
                                <StyledTableCell>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleOpen(user.id)}
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

export default staffTableBody;
