import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

class Approved extends React.Component {
    constructor(props){
        super(props);
        let csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
        this.state={
            questions: [],
            staffs: [],
            csrf_token: csrf_token,
        };
    } 
    
    componentDidMount() {
        axios
            .get("/react/approved/questions")
            .then(response => {
                this.setState({
                    questions: response.data
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
    
    confirmMessage() {
        "use strict"; 
        if (confirm('承認を解除すると質問が公開されなくなります。\nよろしいですか？')){
            document.getElementById('unapprove').submit();
        }else{
            window.alert('キャンセルしました');
            return false;
        }
    }
    
    render(){
        const list = this.state.staffs.map((staff) => {
            return (
                <div className="content">
                    <h1 className="title">{ staff.name }</h1>
                    { this.state.questions.map((question) => {
                        if(question.user_id === staff.id){
                            return (
                                <div>
                                    <div className="question">
                                        ・<a href={ `/questions/`+question.id }>{ question.question }</a>
                                    </div>
                                    <div className="button">
                                        <form action={ `/questions/`+question.id+`/uncheck` } method="post" id="unapprove">
                                            <input type="hidden" name="_token" value={ this.state.csrf_token }/>
                                            <input type="submit" className="hidden"/>
                                            <a onClick={() => { this.confirmMessage() }} className="approveBtn">承認を解除する</a>
                                        </form>
                                    </div>
                                </div>
                            );
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

export default Approved;
