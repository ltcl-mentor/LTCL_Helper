import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

class Approved extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questions: [],
            staffs: [],
            id: '',
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
    }
    
    confirmMessage(id) {
        "use strict"; 
        if (confirm('承認を解除すると質問が公開されなくなります。\nよろしいですか？')){
            this.setState({ id: id });
        }else{
            window.alert('キャンセルしました');
            return false;
        }
    }
    
    handleSubmit(event, id) {
        event.preventDefault();
        const csrf = {
            _token: this.props.csrf_token
        };
        
        if(this.state.id === id){
            axios
            .post(`/questions/${id}/uncheck`, { csrf })
            .then(response => {
                this.setState({
                    questions: response.data
                });
            }).catch(error => {
                console.log(error);
            }); 
            
            this.setState({ id: false });
        }
        
    }
    
    render(){
        const list = this.props.staffs.map((staff) => {
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
                                        <form onSubmit={ this.handleSubmit(event, question.id) } id={`unapprove_`+question.id}>
                                                <input type="submit" className="hidden"/>
                                            <a onClick={() => { this.confirmMessage(question.id) }} className="approveBtn">承認を解除する</a>
                                        </form>
                                    </div>
                                </div>
                            );
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
                            <form action={ `/questions/`+question.id+`/uncheck` } method="post" id="unapprove">
                                <input type="hidden" name="_token" value={ this.state.csrf_token }/>
                                <input type="submit" className="hidden"/>
                                <a onClick={() => { this.confirmMessage() }} className="approveBtn">承認を解除する</a>
                            </form>
                        </div>
                    </div>
                );
            }
        });
        
        return (
            <div className="container">
                { list }
                <div className="content">
                    <h1 className="title">削除済みユーザー</h1>
                    { no_author_list }
                </div>
            </div>
        );
    }
}

export default Approved;
