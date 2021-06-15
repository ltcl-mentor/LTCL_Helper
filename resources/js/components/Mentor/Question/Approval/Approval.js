import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from "axios";
import Approved from './approved';
import Unapproved from './unapproved';

class Approval extends React.Component{
    constructor(props){
        super(props);
        let csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
        this.state={
            csrf_token: csrf_token,
            login_user_id: [],
            staffs: [],
        };
    }
    
    componentDidMount() {
        axios
            .get("/react/id")
            .then(response => {
                this.setState({
                    login_user_id: response.data
                });
                
            }).catch(error => {
                console.log(error);
            });
            
        axios
            .get("/react/all/staffs")
            .then(response => {
                this.setState({
                    staffs: response.data
                });
 
            }).catch(error => {
                console.log(error);
            }); 
    }
    
    render(){
        return (
            <div>
                <Tabs>
                    <TabList>
                        <Tab>承認待ち</Tab>
                        <Tab>承認済み</Tab>
                    </TabList>
    
                    <TabPanel>
                        <Unapproved
                            csrf_token={ this.state.csrf_token }
                            login_user_id={ this.state.login_user_id }
                            staffs={ this.state.staffs }
                        />
                    </TabPanel>

                    <TabPanel>
                        <Approved
                            csrf_token={ this.state.csrf_token }
                            staffs={ this.state.staffs }
                        />
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

export default Approval;

if (document.getElementById('Approval')) {
    ReactDOM.render(<Approval />, document.getElementById('Approval'));
}
