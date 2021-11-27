import React, {useState} from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@mui/material/Button';
import SaveIcon from '@material-ui/icons/Save';
import Card from '@material-ui/core/Card';
import Box from '@mui/material/Box';

import Breadcrumbs from '../../../../Breadcrumbs';

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
                });
        } else {
            return false;
        }
    };
    
    return (
        <div class="container">
            <Breadcrumbs page="mentor_admin_create"/>
            
            <Box sx={{ width: "70%", marginLeft: "15%" }}>
                <Card sx={{ marginBottom: 2, paddingTop: 3 }}>
                    <div className="form-group row">
                        <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                        <div className="col-md-6">
                            <input id="name" type="text" className="form-control @error('name') is-invalid @enderror" name="name" required autocomplete="name" autofocus/>
                        </div>
                    </div>
                        
                    <div class="form-group row">
                        <label for="password" className="col-md-4 col-form-label text-md-right">Password</label>
                        
                        <div class="col-md-6">
                            <input id="password" type="password" className="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password"/>
                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <label for="password-confirm" className="col-md-4 col-form-label text-md-right">Confirm Password</label>
                        
                        <div class="col-md-6">
                            <input id="password-confirm" type="password" className="form-control" name="password_confirmation" required autocomplete="new-password"/>
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