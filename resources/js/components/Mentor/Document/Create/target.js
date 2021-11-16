import React,{useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function Target(props) {
    const handleChange = (event) => {
        props.setTargets({
            ...props.targets,
            [event.target.name]: event.target.checked,
        });
    };
    
    const { beginner, amature, master, all } = props.targets;
    const error = [beginner, amature, master, all].filter((v) => v).length == 0;
    let target_validation_message;
    error ? target_validation_message = (<Typography color="error">対象者してください。</Typography>) : target_validation_message = ('');
    
    return (
        <div>
            <Typography
                variant="h5"
                component="div"
                sx={{
                    marginTop: 4,
                    marginLeft: 2,
                }}
            >
                1. 対象者の選択（複数可）
            </Typography>
            
            <Box sx={{ marginLeft: 5 }}>
                <FormControl
                    required
                    error={ error }
                    component="fieldset"
                    sx={{ m: 3 }}
                    variant="standard"
                >
                    { target_validation_message }
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={ beginner } onChange={ handleChange } name="beginner" />
                            }
                            label="初級者"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={ amature } onChange={ handleChange } name="amature" />
                            }
                            label="中級者"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={ master } onChange={ handleChange } name="master" />
                            }
                            label="上級者"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={ all } onChange={ handleChange } name="all" />
                            }
                            label="全員必読"
                        />
                    </FormGroup>
                </FormControl>
            </Box>
        </div>
    );
}

export default Target;