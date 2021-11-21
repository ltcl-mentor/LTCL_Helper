import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from "axios";
import {useParams} from 'react-router-dom';

import Alert from '../../../../Alert';
import Breadcrumbs from '../../../../Breadcrumbs';
import Parameters from './parameters';
import Links from './links';

function Index() {
    const { id } = useParams();
    const parameter = useLocation().search.substr(1).split('=');
    const [doc, setDoc] = useState([]);
    const [attach_id, setAttachId] = useState([]);
    const [detach_id, setDetachId] = useState([]);
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    
    useEffect(() => {
        axios
            .get(`/react/document/${ id }`)
            .then(response => {
                setDoc(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    let set = 0;
    const handleSubmit = () => {
        // フォーム送信と重複保存の防止
        if (set === 0) {
            document.getElementById('link').submit();
            set=1;
        } else {
            return false;
        }
    };
    
    return (
        <div class="container">
            <Alert type={ parameter[0] } status={ parameter[1] }/>
            
            <Breadcrumbs page="mentor_link_document_show"/>
            
            <Parameters 
                title={ doc.title }
                targets={ [
                    doc.beginner ? "初心者" : false,
                    doc.amature ? "中級者" : false,
                    doc.master ? "上級者" : false,
                    doc.all ? "全員" : false,
                ] }
                link={ doc.link }
                author={ doc.user_id }
            />
            
            <Links
                id={ id }
                attach_id={ attach_id }
                setAttachId={ setAttachId }
                detach_id={ detach_id }
                setDetachId={ setDetachId }
                csrf_token={ csrf_token }
                handleSubmit={ handleSubmit }
            />
        </div>
    );
}

export default Index;
