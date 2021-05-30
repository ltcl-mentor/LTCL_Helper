import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Approved from './approved';
import Unapproved from './unapproved';

class Approval extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
        };
    }
    
    render(){
        return (
            <div>
            <Tabs>
                <TabList>
                    <Tab>承認済み</Tab>
                    <Tab>承認待ち</Tab>
                </TabList>
            
                <TabPanel>
                    <Approved />
                </TabPanel>
                <TabPanel>
                    <Unapproved />
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
