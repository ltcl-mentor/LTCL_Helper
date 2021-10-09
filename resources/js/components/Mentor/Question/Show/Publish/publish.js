import React, {useState, useEffect} from 'react';
import Modal from "react-modal";
import Preview from './preview';
import CheckForm from './checkForm';

Modal.setAppElement("#app");

function Publish(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    const openModal = () => {
        setModalIsOpen(true);
    };
 
    const closeModal = () => {
        setModalIsOpen(false);
    };
    
    const unpublishConfirm = () => {
        "use strict"; 
        if (confirm('質問が非公開になります。\nよろしいですか？')){
            document.getElementById('unpublish').submit();
        }else{
            window.alert('キャンセルしました');
            return false;
        }
    };
    
    let publishBtn;
    if(props.question.check === 0){
        publishBtn = (<div><p onClick={() => { openModal() }} className="publishBtn">公開する</p></div>);
    }else{
        publishBtn = (
            <div>
                <form action={`/questions/` + props.question_id + `/uncheck`} method="post" id="unpublish">
                    <input type="hidden" name="_token" value={ props.csrf_token }/>
                    <input type="submit" className="hidden"/>
                    <p className="publishBtn" onClick={() => { unpublishConfirm() }}>非公開にする</p>
                </form>
            </div>
        );
    }
    
    return (
        <div>
            <Modal
                isOpen={ modalIsOpen }
                onRequestClose={() => { closeModal() }}
            >
                <button onClick={() => { closeModal() }}>×</button>
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
                
            </Modal>
            
            { publishBtn }
        </div>
    );
}

export default Publish;