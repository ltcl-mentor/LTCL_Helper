import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Questions from './questions';
import Documents from './documents';

class Link extends React.Component{
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
                        <Tab>質問から紐付け</Tab>
                        <Tab>記事から紐付け</Tab>
                    </TabList>
            
                    <TabPanel>
                        <Questions />
                    </TabPanel>
                
                    <TabPanel>
                        <Documents />
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

export default Link;

if (document.getElementById('Link')) {
    ReactDOM.render(<Link />, document.getElementById('Link'));
}
