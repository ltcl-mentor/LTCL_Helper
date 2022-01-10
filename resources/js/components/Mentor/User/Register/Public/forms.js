import React, {useState} from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';

/**
 * 受講生情報入力フォーム
 */
function Forms(props) {
    const history = useHistory();
    const [clickCount, setClickCount] = useState(0);

    const handleSubmit = () => {
        let names = [];
        for (formCount=1; formCount<=props.number; formCount++) {
            names.push(document.getElementById(`name`+formCount).value);
        }
        
        if (clickCount === 0) {
            setClickCount(1);
            axios
                .post("/users/public/register", {
                    names: names,
                    password: document.getElementById('password').value
                })
                .then(response => {
                    if (response.status === 200) {
                        history.push("/users/index", { user: "public_created", number: names.length });
                    }
                }).catch(error => {
                    console.log(error);
                });
        } else {
            return false;
        }
        
    };
    
    let formCount;
    let forms = [];
    for (formCount = 1; formCount <= props.number; formCount++) {
        forms.push(
            <Box sx={{ marginTop: 3 }}>
                <div className="form-group row">
                    <label for="name" className="col-md-4 col-form-label text-md-right">name{ formCount }</label>
                    <div className="col-md-6">
                        <input id={ `name` + formCount } type="text" className="form-control" name={ `name` + formCount } required autoComplete="name"/>
                    </div>
                </div>
            </Box>
        ); 
    }
    
    return (
        <Box sx={{ width: "70%", marginLeft: "15%" }}>
            { (props.number && props.password.length === 8) &&
                <Card sx={{ marginBottom: 2 }}>
                        
                    { forms }
                        
                    <input id="password" type="hidden" value={ props.password }/>
                        
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
            }
        </Box>
    );
}

export default Forms;
