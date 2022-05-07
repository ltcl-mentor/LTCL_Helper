import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useLocation, useHistory} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Alert from '../../../Alert';
import Breadcrumbs from '../../../Breadcrumbs';
import Students from './students';
import Admins from './admins';

/**
 * ユーザ一覧のメインコンポーネント
 */
function Index() {
    const parameter = useLocation();
    const history = useHistory();
    const [staffs, setStaffs] = useState([]);
    const [students, setStudents] = useState([]);
    const [delete_user_id, setDeleteUserId] = useState();
    const [unlock_user_id, setUnlockUserId] = useState();
    const [value, setValue] = React.useState(0);
    
    // 画面描画時に実行
    useEffect(() => {
        // 管理者一覧取得
        axios
            .get(`/react/all/staffs`)
            .then(response => {
                setStaffs(response.data);
            }).catch(error => {
                console.log(error);
            });
            
        // 受講生一覧取得
        axios
            .get(`/react/all/students`)
            .then(response => {
                setStudents(response.data);
            }).catch(error => {
                console.log(error);
            });
            
        if (parameter.state && parameter.state.value) {
            setValue(parameter.state.value);
        }
    }, []);
    
    // 削除実行
    useEffect(() => {
        if (delete_user_id) {
            if (confirm('データが削除されます。\nよろしいですか？')) {
                axios
                    .post(`/users/${ delete_user_id }/delete`)
                    .then(response => {
                        if (response.status === 200) {
                            setStaffs(response.data.staffs);
                            setStudents(response.data.students);
                            history.push("/users/index", { user: "deleted", number: delete_user_id });
                        }
                    }).catch(error => {
                        console.log(error);
                    });
            } else {
                window.alert('キャンセルしました');
                return false;
            }
        }
    }, [delete_user_id]);
    
    // ユーザロック解除実行
    useEffect(() => {
        if (unlock_user_id) {
            if (confirm('ユーザのロックを解除します。\nよろしいですか？')) {
                axios
                    .post(`/users/${ unlock_user_id }/unlock`)
                    .then(response => {
                        if (response.status === 200) {
                            setStaffs(response.data.staffs);
                            setStudents(response.data.students);
                        }
                    }).catch(error => {
                        console.log(error);
                    });
            } else {
                window.alert('キャンセルしました');
                return false;
            }
        }
    }, [unlock_user_id]);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    return (
        <div className="container">
            <Alert
                type="user"
                status={ parameter.state && parameter.state.user }
                info={ parameter.state && parameter.state.number }
            />
            
            <Breadcrumbs page="mentor_user_index"/>
            
            <Box sx={{ marginTop: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={ value } onChange={ handleChange } aria-label="basic tabs example">
                    <Tab label="受講生一覧" />
                    <Tab label="管理者一覧" />
                </Tabs>
            </Box>
            
            <Box sx={{ marginTop: 3 }}>
                { value === 0 ? 
                    <Students
                        students={ students }
                        setDeleteUserId={ setDeleteUserId }
                        setUnlockUserId={ setUnlockUserId }
                    />
                : 
                    <Admins
                        staffs={ staffs }
                        setDeleteUserId={ setDeleteUserId }
                        setUnlockUserId={ setUnlockUserId }
                    />
                }
            </Box>
        </div>
    );
}

export default Index;