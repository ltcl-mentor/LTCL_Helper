import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import SaveIcon from '@material-ui/icons/Save';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import Card from '@material-ui/core/Card';
import TextareaAutosize from '@mui/material/TextareaAutosize';

function Contact() {
    const [contact, setContact] = useState('');
    const [contact_validation_error, setContactValidationError] = useState(false);
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    
    let set = 0;
    const handleClick = () => {
        // 問い合わせのバリデーション
        if (contact.trim().length !== 0) {
            if (set === 0) {
                if (window.confirm('お問合せを送信します。よろしいですか？')) {
                    document.getElementById('create').submit();
                    set=1;
                }
            } else {
                return false;
            }
        } else {
            setContactValidationError(true);
            return false;
        }
    };
    
    const handleContact = (event) => {
        setContact(event.target.value);
    };
    
    let validation_message;
    if (contact_validation_error === true) {
        validation_message = <p className="errorMassage">お問い合わせ内容を入力してください。</p>;
    } else {
        validation_message = ('');
    }
    
    return (
        <div className="container">
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 4 }}>
                <Link underline="hover" to="/">
                    HOME
                </Link>
                
                <Typography color="text.primary">
                    お問合せ
                </Typography>
            </Breadcrumbs>
            
            <Box sx={{ width: "70%", marginLeft: "15%" }}>
                <form action="/contact" method="post" id="create" enctype="multipart/form-data">
                    <input type="hidden" value={ csrf_token } name="_token" />
                    
                    <Card sx={{ marginBottom: 2 }}>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                marginTop: 4,
                                marginLeft: 2,
                            }}
                        >
                            お問合せ内容
                        </Typography>
                        
                        { validation_message }
                        
                        <Box sx={{ textAlign: "center", marginTop: 4 }}>
                            <TextareaAutosize 
                                name="message"
                                placeholder="お問合せ内容を入力してください。"
                                minRows={8}
                                value={ contact }
                                onChange={ (event) => handleContact(event) }
                                style={{ 
                                    width: "80%",
                                    paddingTop:2,
                                }}
                            />
                        </Box>
                        
                        <Typography
                            align="center"
                            component="div"
                            sx={{
                                marginTop: 4,
                                marginBottom: 3,
                            }}
                        >
                            <Button onClick={ handleClick } variant="contained" endIcon={<SaveIcon />}>
                                送信する
                            </Button>
                        </Typography>
                    </Card>
                </form>
            </Box>
        </div>
    );
}

export default Contact;
