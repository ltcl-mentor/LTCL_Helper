import React, {useState} from 'react';

function Forms(props) {
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    const [clickCount, setClickCount] = useState(0);

    const doubleClickStopper = () => {
        if( clickCount === 0){
            setClickCount(1);
            document.getElementById('create').submit();
        }else{
            return false;
        }
    };
    
    let formCount;
    let forms = [];
    for(formCount=1; formCount<=props.number; formCount++) {
        forms.push(
            <div>
                <div className="form-group row">
                    <label for="name" className="col-md-4 col-form-label text-md-right">name{ formCount }</label>

                    <div className="col-md-6">
                        <input id="name" type="text" className="form-control" name={ `name`+formCount } required autoComplete="name"/>
                    </div>
                </div>
                
                <div className="form-group row">
                    

                    <div className="col-md-6">
                        <input id="password" type="hidden" className="form-control" name="password" required autoComplete="new-password" value={ props.password }/>
                        <input type="hidden" name="password_confirmation" value={ props.password }/>
                    </div>
                </div>
            </div>
        ); 
    }
    
    let submitBtn;
    if(props.number){
        submitBtn = (
             <div className="form-group row mb-0">
                <div className="col-md-6 offset-md-4">
                    <p className="btn btn-primary" onClick={() => { doubleClickStopper() }}>
                        Register
                    </p>
                </div>
            </div>
        );
    }
    
    return (
        <div>
            <form method="POST" action="/users/public/register" id="create">
                <input type="hidden" name="_token" value={ csrf_token }/>
                { forms }
                { submitBtn }
            </form>
        </div>
    );
}

export default Forms;
