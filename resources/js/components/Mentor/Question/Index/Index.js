import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Curriculum from './curriculum';
import Portfolio from './portfolio';

class Index extends React.Component{
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
                    <Tab>カリキュラム</Tab>
                    <Tab>成果物</Tab>
                </TabList>
            
                <TabPanel>
                    <Curriculum />
                </TabPanel>
                
                <TabPanel>
                    <Portfolio />
                </TabPanel>
            </Tabs>
            </div>
        );
    }
}

export default Index;

if (document.getElementById('Index')) {
    ReactDOM.render(<Index />, document.getElementById('Index'));
}
