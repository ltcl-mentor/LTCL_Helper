import React from 'react';
import ReactDOM from 'react-dom';


class CheckForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            check1: false,
            check2: false,
            check3: false,
        };
    }
    
    check1() {
        if(this.state.check1){
            this.setState({ check1: false });
        }else{
            this.setState({ check1: true });
        }
    }
    
    check2() {
        if(this.state.check2){
            this.setState({ check2: false });
        }else{
            this.setState({ check2: true });
        }
    }
    
    check3() {
        if(this.state.check3){
            this.setState({ check3: false });
        }else{
            this.setState({ check3: true });
        }
    }
    
    render(){
        let btn;
        if(this.state.check1 && this.state.check2 && this.state.check3){
            btn = (<div><input type="submit" value="公開する" className="submit_btn"/></div>);
        }else{
            btn = (<div className="pre_btn">公開する</div>);
        }
        
        return (
            <div className="checkForm">
                <div>以下の確認事項を確認してチェックを入れてください。</div>
                <form action={`/questions/`+this.props.question_id+`/check`} method="post">
                    <input type="hidden" name="_token" value={ this.props.csrf_token }/>
                    <div><label><input type="checkbox" name="check1" onClick={() => { this.check1() }} className="check"/>誤字、脱字、不適切な表現はありませんか？</label></div>
                    <div><label><input type="checkbox" name="check2" onClick={() => { this.check2() }} className="check"/>（参考画像がある場合）個人情報が漏洩するような部分はありませんか？</label></div>
                    <div><label><input type="checkbox" name="check3" onClick={() => { this.check3() }} className="check"/>公開する内容に間違いはありませんか？</label></div>
                    { btn }
                </form>
            </div>
        );
    }
}

export default CheckForm;