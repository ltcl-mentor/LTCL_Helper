import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useLocation} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Alert from '../../../Alert';
import Breadcrumbs from '../../../Breadcrumbs';
import Students from './students';
import Admins from './admins';

function Index() {
    const parameter = useLocation().search.substr(1).split('=');
    const [staffs, setStaffs] = useState([]);
    const [students, setStudents] = useState([]);
    const [delete_user_id, setDeleteUserId] = useState();
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    const [value, setValue] = React.useState(0);
    
    useEffect(() => {
        axios
            .get(`/react/all/staffs`)
            .then(response => {
                setStaffs(response.data);
            }).catch(error => {
                console.log(error);
            });
            
        axios
            .get(`/react/all/students`)
            .then(response => {
                setStudents(response.data);
            }).catch(error => {
                console.log(error);
            });
    }, []);
    
    useEffect(() => {
        if (delete_user_id) {
            if (confirm('データが削除されます。\nよろしいですか？')) {
                document.getElementById('delete').submit();
            } else {
                window.alert('キャンセルしました');
                return false;
            }
        }
    }, [delete_user_id]);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    let tab_content;
    if (value === 0) {
        tab_content = (<Students students={ students } setDeleteUserId={ setDeleteUserId }/>);
    } else {
        tab_content = (<Admins staffs={ staffs } setDeleteUserId={ setDeleteUserId }/>);
    }
    
    return (
        <div className="container">
            <Alert type={ parameter[0] } status={ parameter[1] }/>
            
            <Breadcrumbs page="mentor_user_index"/>
            
            <form action={ `/users/` + delete_user_id + `/delete` } method="post" id="delete">
                <input type="hidden" name="_token" value={ csrf_token }/>
            </form>
            
            <Box sx={{ marginTop: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={ value } onChange={ handleChange } aria-label="basic tabs example">
                    <Tab label="受講生一覧" />
                    <Tab label="管理者一覧" />
                </Tabs>
            </Box>
            
            <Box sx={{ marginTop: 3 }}>
                { tab_content }
            </Box>
        </div>
    );
}

export default Index;