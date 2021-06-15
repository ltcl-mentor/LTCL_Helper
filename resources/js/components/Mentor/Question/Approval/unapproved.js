import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

class Unapproved extends React.Component {
    constructor(props){
        super(props);
        let csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
        this.state={
            questions: [],
            login_user_id: [],
            staffs: [],
            csrf_token: csrf_token,
            id: '',
        }; 
    } 
    
    componentDidMount() {
        axios
            .get("/react/unapproved/questions")
            .then(response => {
                this.setState({
                    questions: response.data
                });
 
            }).catch(error => {
                console.log(error);
            });
            
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
    
    confirmMessage(id) {
        "use strict"; 
        if (confirm('承認すると質問が全体に公開されます。\nよろしいですか？')){
            this.setState({ id: id });
            document.getElementById('approve'+id).submit();
        }else{
            window.alert('キャンセルしました');
            return false;
        }
    }
    
    handleSubmit(event, id) {
        event.preventDefault();
        const csrf = {
            _token: this.state.csrf_token
        };
        
        if(this.state.id === id){
            axios
            .post(`/questions/${id}/check`, { csrf })
            .then(response => {
                this.setState({
                    questions: response.data
                });
            }).catch(error => {
                console.log(error);
            }); 
            
            this.setState({ id: null });
        }
        
    }
    
    render(){
        const author_list = this.state.staffs.map((staff) => {
            return (
                <div className="content">
                    <h1 className="title">{ staff.name }</h1>
                    { this.state.questions.map((question) => {
                        if( question.user_id === staff.id ){
                            if( question.user_id === this.state.login_user_id ){
                                return (
                                    <div>
                                        <div className="question">・<a href={ `/questions/`+question.id }>{ question.question }</a></div>
                                        <p className="message">作成者以外からの承認が必要です。</p>
                                    </div>
                                );
                            }else{
                                return (
                                    <div>
                                        <div className="question">・<a href={ `/questions/`+question.id }>{ question.question }</a></div>
                                        <div className="button">
                                            <form onSubmit={ this.handleSubmit(event, question.id) } id={`unapprove_`+question.id}>
                                                <input type="submit" className="hidden"/>
                                                <a onClick={() => { this.confirmMessage(question.id) }} className="approveBtn">承認する</a>
                                            </form>
                                        </div>
                                    </div>
                                );
                            }
                        }
                    })}
                </div>
            );
        });
        
        const no_author_list = this.state.questions.map((question) => {
            if(question.user_id === 0){
                return (
                    <div>
                        <div className="question">・<a href={ `/questions/`+question.id }>{ question.question }</a></div>
                        <div className="button">
                            <form onSubmit={ this.handleSubmit(event, question.id) } id={`approve_`+question.id}>
                                <input type="submit" className="hidden"/>
                                <a onClick={() => { this.confirmMessage(question.id) }} className="approveBtn">承認する</a>
                            </form>
                        </div>
                    </div>
                );
            }
        });
        
        return (
            <div className="container">
                { author_list }
                <div className="content">
                    <h1 className="title">削除済みユーザー</h1>
                    { no_author_list }
                </div>
            </div>
        );
    }
}

export default Unapproved;
