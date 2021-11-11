import React,{useState} from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import SaveIcon from '@material-ui/icons/Save';

import Title from './title';
import Link from './link';

function Create() {
    const [title, setTitle] = useState('');
    const [title_validation_error, setTitleValidationError] = useState(false);
    const [link, setLink] = useState('');
    const [link_validation_error, setLinkValidationError] = useState(false);
    const [targets, setTargets] = useState({
        beginner: true,
        amature: false,
        master: false,
        all: false,
     });
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    
    const handleChange = (event) => {
        setTargets({
            ...targets,
            [event.target.name]: event.target.checked,
        });
    };
    
    const { beginner, amature, master, all } = targets;
    const error = [beginner, amature, master, all].filter((v) => v).length == 0;
    let target_validation_message;
    error ? target_validation_message = (<p className="errorMassage">対象者してください。</p>) : target_validation_message = ('');
    
    let set = 0;
    const handleClick = () => {
        // タイトルのバリデーション
        if ( !(title.trim().length !== 0 && title.trim().length <= 50) ) {
            setTitleValidationError(true);
            return false;
        }
        
        // URLのバリデーション
        if ( !(link.trim().length !== 0) ) {
            setLinkValidationError(true);
        }
        
        // フォーム送信と重複保存の防止
        if (set === 0) {
            document.getElementById('create').submit();
            set=1;
        } else {
            return false;
        }
    };
    
    return (
        <div className="container">
            <form action="/documents/store" method="post" id="create">
                <input type="hidden" value={ csrf_token } name="_token" />
                
                <h2 className="title">対象者の選択</h2>
                <FormControl
                    required
                    error={error}
                    component="fieldset"
                    sx={{ m: 3 }}
                    variant="standard"
                >
                    { target_validation_message }
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={beginner} onChange={handleChange} name="beginner" />
                            }
                            label="初級者"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={amature} onChange={handleChange} name="amature" />
                            }
                            label="中級者"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={master} onChange={handleChange} name="master" />
                            }
                            label="上級者"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={all} onChange={handleChange} name="all" />
                            }
                            label="全員必読"
                        />
                    </FormGroup>
                </FormControl>
                
                <Title 
                    title={ title }
                    setTitle={ setTitle }
                    title_validation_error={ title_validation_error }
                />
                
                <Link
                    link={ link }
                    setLink={ setLink }
                    link_validation_error={ link_validation_error }
                />
            
                <Button onClick={ handleClick } variant="contained" endIcon={<SaveIcon />}>
                    登録する
                </Button>
            </form>
        </div>
    );
}

export default Create;
