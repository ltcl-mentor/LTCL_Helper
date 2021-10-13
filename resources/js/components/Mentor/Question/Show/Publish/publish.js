import React, {useState, useEffect} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Preview from './preview';
import CheckForm from './checkForm';

// モーダルのCSS設定
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:'50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height: '70%',
  overflow: 'scroll',
};

function Publish(props) {
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => setOpen(true);
    
    const handleClose = () => setOpen(false);
    
    const unpublishConfirm = () => {
        "use strict"; 
        if (confirm('質問が非公開になります。\nよろしいですか？')) {
            document.getElementById('unpublish').submit();
        } else {
            window.alert('キャンセルしました');
            return false;
        }
    };
    
    let publishBtn;
    if (props.question.check === 0) {
        publishBtn = (<div><p onClick={ handleOpen } className="publishBtn">公開する</p></div>);
    } else {
        publishBtn = (
            <div>
                <form action={ `/questions/` + props.question_id + `/uncheck` } method="post" id="unpublish">
                    <input type="hidden" name="_token" value={ props.csrf_token }/>
                    <input type="submit" className="hidden"/>
                    <p className="publishBtn" onClick={ unpublishConfirm }>非公開にする</p>
                </form>
            </div>
        );
    }
    
    return (
        <div>
            <Modal
                open={ open }
                onClose={ handleClose }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={ style }>
                    <button onClick={ handleClose }>×</button>
                    <div className="alert">これは公開時のプレビューです。まだ公開処理は完了していません。</div>
                
                    <CheckForm 
                        question_id={ props.question_id }
                        csrf_token={ props.csrf_token }
                    />
                
                    <Preview 
                        question={ props.question }
                        images={ props.images }
                        documents={ props.documents }
                        category={ props.category }
                        topic={ props.topic }
                    />
                </Box>
                
            </Modal>
            
            { publishBtn }
        </div>
    );
}

export default Publish;