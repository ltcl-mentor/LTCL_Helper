import React from 'react';
import ReactDOM from 'react-dom';

class Forms extends React.Component{
    constructor(props){
        super(props);
        let csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
        this.state={
            csrf_token: csrf_token,
        };
    }
    
    render(){
        var i;
        let forms = [];
        for(i=1;i<=this.props.number;i++) {
            forms.push(
                <div>
                    <div className="form-group row">
                        <label for="name" className="col-md-4 col-form-label text-md-right">name{ i }</label>

                        <div className="col-md-6">
                            <input id="name" type="text" className="form-control" name={`name`+i} required autoComplete="name"/>
                        </div>
                    </div>
                    
                    <div className="form-group row">
                        

                        <div className="col-md-6">
                            <input id="password" type="hidden" className="form-control" name="password" required autoComplete="new-password" value={ this.props.password }/>
                            <input type="hidden" name="password_confirmation" value={ this.props.password }/>
                        </div>
                    </div>
                </div>
            ); 
        }
        
        let submitBtn;
        if(this.props.number){
            submitBtn = (
                 <div className="form-group row mb-0">
                    <div className="col-md-6 offset-md-4">
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                    </div>
                </div>
            );
        }
        
        return (
            <div>
                <form method="POST" action="/users/public/register">
                    <input type="hidden" name="_token" value={ this.state.csrf_token }/>
                    { forms }
                    { submitBtn }
                </form>
            </div>
        );
    }
}

export default Forms;
