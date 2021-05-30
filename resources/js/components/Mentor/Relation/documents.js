import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

class Documents extends React.Component {
    constructor(props){
        super(props);
        let csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
        this.state={
            documents: [],
            staffs: [],
            csrf_token: csrf_token,
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
                    <h1 className="title">{ staff.name }</h1>
                    { this.state.documents.map((document) => {
                        if(document.user_id === staff.id){
                            return <div  className="question">・<a href={ `/relations/document/`+document.id }>{ document.title }</a></div>;
                        }
                    })}
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
