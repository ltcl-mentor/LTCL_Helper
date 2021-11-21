import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';

function Forms(props) {
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    const [clickCount, setClickCount] = useState(0);

    const handleSubmit = () => {
        if (clickCount === 0) {
            setClickCount(1);
            document.getElementById('create').submit();
        } else {
            return false;
        }
    };
    
    let formCount;
    let forms = [];
    for (formCount=1; formCount<=props.number; formCount++) {
        forms.push(
            <Box sx={{ marginTop: 3 }}>
                <div className="form-group row">
                    <label for="name" className="col-md-4 col-form-label text-md-right">name{ formCount }</label>
                    <div className="col-md-6">
                        <input id="name" type="text" className="form-control" name={ `name` + formCount } required autoComplete="name"/>
                    </div>
                </div>
                
                <div className="form-group row">
                    <div className="col-md-6">
                        <input id="password" type="hidden" className="form-control" name="password" required autoComplete="new-password" value={ props.password }/>
                        <input type="hidden" name="password_confirmation" value={ props.password }/>
                    </div>
                </div>
            </Box>
        ); 
    }
    
    return (
        <Box sx={{ width: "70%", marginLeft: "15%" }}>
            { (props.number && props.password) &&
                <Card sx={{ marginBottom: 2 }}>
                    <form method="POST" action="/users/public/register" id="create">
                        <input type="hidden" name="_token" value={ csrf_token }/>
                        
                        { forms }
                        
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
                    </form>
                </Card>
            }
        </Box>
    );
}

export default Forms;
