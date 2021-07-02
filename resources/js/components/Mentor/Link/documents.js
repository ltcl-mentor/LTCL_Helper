import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

class Documents extends React.Component {
    constructor(props){
        super(props);
        this.state={
            documents: [],
            staffs: [],
        };
    } 
    
    componentDidMount() {
        axios
            .get("/react/all/documents")
            .then(response => {
                this.setState({
                    documents: response.data
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
        const list = this.state.staffs.map((staff) => {
            return (
                <div className="content">
                    <details>
                        <summary><h1 className="title">{ staff.name }</h1></summary>
                        { this.state.documents.map((document) => {
                            if(document.user_id === staff.id){
                                return <div  className="question">・<a href={ `/links/document/`+document.id }>{ document.title }</a></div>;
                            }
                        })}
                    </details>
                </div>
            );
        });
        
        return (
            <div className="container">
                { list }
            </div>
        );
    }
}

export default Documents;
