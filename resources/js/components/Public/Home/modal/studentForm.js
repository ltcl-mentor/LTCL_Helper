import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@material-ui/core/Typography';


/**
 * 受講生情報入力フォーム
 */
const Forms = (props) => {
    const history = useHistory();
    const [clickCount, setClickCount] = useState(0);
    const [error, setError] = useState('');

    const handleSubmitStudents = () => {
        setError('');
        let names = [];
        for (formCount=1; formCount<=props.number; formCount++) {
            let name = document.getElementById(`name`+formCount).value;
            if (name.length == 0) {
                setError('すべての受講生IDを入力してください。');
                return false;
            } else {
                names.push(name);
            }
        }

        if (clickCount === 0) {
            setClickCount(1);
            axios
                .post("/users/public/register", {
                    names: names,
                    password: props.password
                })
                .then(response => {
                    if (response.status === 200) {
                        setClickCount(0);
                        props.setStudents({
                            eventList: response.data.students.data,
                            itemsCountPerPage: response.data.students.per_page,
                            totalItemsCount: response.data.students.total,
                            currentPage: response.data.students.current_page,
                            pageRangeDisplayed: 10,
                            lastPage: response.data.students.last_page,
                        });
                        props.setStaffs({
                            eventList: response.data.staffs.data,
                            itemsCountPerPage: response.data.staffs.per_page,
                            totalItemsCount: response.data.staffs.total,
                            currentPage: response.data.staffs.current_page,
                            pageRangeDisplayed: 10,
                            lastPage: response.data.staffs.last_page,
                        });
                        props.onClose();
                        history.push("/?page=manage", {type: "user", status: 'public_created', info: props.number});
                    }
                }).catch(error => {
                    console.log(error);
                    setClickCount(0);
                });
        } else {
            return false;
        }

    };

    let formCount;
    let forms = [];
    for (formCount = 1; formCount <= props.number; formCount++) {
        forms.push(
            <Box sx={{ marginTop: 3 }} key={formCount}>
                <div className="form-group row">
                    <label htmlFor="name" className="col-md-4 col-form-label text-md-right">受講生{ formCount }</label>
                    <div className="col-md-6">
                        <input id={ `name` + formCount } type="text" placeholder="受講生IDを入力" className="form-control" name={ `name` + formCount } required autoComplete="name"/>
                    </div>
                </div>
            </Box>
        );
    }

    return (
        <Box sx={{ width: "70%", marginLeft: "15%" }}>
            {(props.number && props.password.length === 8) &&
                <React.Fragment>
                    { forms }

                    {error.length > 0 &&
                        <Typography align="center" component="div" sx={{ color: "red", fontSize: '14px' }}>
                            {error}
                        </Typography>
                    }

                    <Typography
                        align="center"
                        component="div"
                        sx={{
                            marginTop: 4,
                            marginBottom: 3,
                        }}
                    >
                        <Typography align="center" component="div" sx={{ marginTop: 4, marginBottom: 3 }}>
                            <Button
                                onClick={() => handleSubmitStudents()}
                                variant="outlined"
                                sx={{
                                    color: '#771AF8',
                                    border: '1px solid #771AF8',
                                    '&:hover': {
                                        color: 'white',
                                        backgroundColor: '#771AF8',
                                        border: '1px solid #771AF8',
                                    }
                                }}
                            >
                                登録する
                            </Button>
                        </Typography>
                    </Typography>
                </React.Fragment>
            }
        </Box>
    );
};

export default Forms;
