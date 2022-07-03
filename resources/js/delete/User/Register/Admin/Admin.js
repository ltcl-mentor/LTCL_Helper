import React, {useState} from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@mui/material/Button';
import SaveIcon from '@material-ui/icons/Save';
import Card from '@material-ui/core/Card';
import Box from '@mui/material/Box';

import Breadcrumbs from '../../../../Components/Common/Breadcrumbs';

function Admin() {
    const history = useHistory();
    const [clickCount, setClickCount] = useState(0);

    const handleSubmit = () => {
        if (clickCount === 0) {
            setClickCount(1);
            axios
                .post("/users/admin/register", {
                    name: document.getElementById('name').value,
                    password: document.getElementById('password').value
                })
                .then(response => {
                    console.log(response);
                    if (response.status === 200) {
                        history.push("/users/index", { user: "admin_created", number: 1, value: 1 });
                    }
                }).catch(error => {
                    console.log(error);
                    setClickCount(0);
                });
        } else {
            return false;
        }
    };

    // 登録フォームのデザインはLaravelのデフォルトのものを転用
    return (
        <div className="container">
            <Breadcrumbs page="mentor_admin_create"/>

            <Box sx={{ width: "70%", marginLeft: "15%" }}>
                <Card sx={{ marginBottom: 2, paddingTop: 3 }}>
                    <Typography
                        align="center"
                        component="div"
                        sx={{
                            marginTop: 4,
                            marginBottom: 3,
                            color: "red",
                        }}
                    >
                        実名を登録しないでください！
                    </Typography>
                    <div className="form-group row">
                        <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>
                        <div className="col-md-6">
                            <input id="name" type="text" className="form-control" name="name" required autoComplete="name" autoFocus/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                        <div className="col-md-6">
                            <input id="password" type="password" className="form-control" name="password" required autoComplete="new-password"/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-right">Confirm Password</label>

                        <div className="col-md-6">
                            <input id="password-confirm" type="password" className="form-control" name="password_confirmation" required autoComplete="new-password"/>
                        </div>
                    </div>

                    <Typography
                        align="center"
                        component="div"
                        sx={{
                            marginTop: 4,
                            marginBottom: 3,
                        }}
                    >
                        <Button onClick={ handleSubmit } variant="contained" endIcon={<SaveIcon />}>
                            登録する
                        </Button>
                    </Typography>
                </Card>
            </Box>
        </div>
    );
}

export default Admin;
