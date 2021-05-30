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
    
    // 処理の確認に関係なく送信が起きてしまうから意図通りの挙動になってない
    confirmMessage(event) {
        "use strict"; 
        if (window.confirm('承認すると質問が全体に公開されます。\nよろしいですか？')){
            document.forms.submit();
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
                        if( question.user_id === staff.id ){
                            if( question.user_id === this.state.login_user_id ){
                                return (
                                    <div>
                                        <div className="question">・<a href={ `/questions/`+question.id } target="_blank">{ question.question }</a></div>
                                        <p className="message">作成者以外からの承認が必要です。</p>
                                    </div>
                                );
                            }else{
                                return (
                                    <div>
                                        <div className="question">・<a href={ `/questions/`+question.id } target="_blank">{ question.question }</a></div>
                                        <div className="button">
                                            <form action={ `/questions/`+question.id+`/check` } method="post">
                                                <input type="hidden" name="_token" value={ this.state.csrf_token }/>
                                                <a onClick={() => { this.confirmMessage(event);return false; }}><button type="submit">承認</button></a>
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
        
        return (
            <div className="container">
                { list }
            </div>
        );
    }
}

export default Unapproved;
