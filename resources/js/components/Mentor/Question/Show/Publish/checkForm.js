import React, {useState} from 'react';

function CheckForm(props) {
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    
    const handleCheck1 = () => {
        if (check1) {
            setCheck1(false);
        } else {
            setCheck1(true );
        }
    };
    
    const handleCheck2 = () => {
        if (check2) {
            setCheck2(false);
        } else {
            setCheck2(true);
        }
    };
    
    const handleCheck3 = () => {
        if (check3) {
            setCheck3(false);
        } else {
            setCheck3(true);
        }
    };
    
    let btn;
    if (check1 && check2 && check3) {
        btn = (<div><input type="submit" value="公開する" className="submit_btn"/></div>);
    } else {
        btn = (<div className="pre_btn">公開する</div>);
    }
    
    return (
        <div className="checkForm">
            <div>以下の確認事項を確認してチェックを入れてください。</div>
            <form action={ `/questions/` + props.question_id + `/check` } method="post">
                <input type="hidden" name="_token" value={ props.csrf_token }/>
                <div><label><input type="checkbox" name="check1" onClick={ handleCheck1 } className="check"/>誤字、脱字、不適切な表現はありませんか？</label></div>
                <div><label><input type="checkbox" name="check2" onClick={ handleCheck2 } className="check"/>（参考画像がある場合）個人情報が漏洩するような部分はありませんか？</label></div>
                <div><label><input type="checkbox" name="check3" onClick={ handleCheck3 } className="check"/>公開する内容に間違いはありませんか？</label></div>
                { btn }
            </form>
        </div>
    );
}

export default CheckForm;