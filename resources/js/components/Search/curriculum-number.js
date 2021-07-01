import React from 'react';
import ReactDOM from 'react-dom';

class CrriculumNumber extends React.Component{
    constructor(props){
        super(props);
        this.state={
            curriculum_number: '',
        };
    }
    
    setCurriculumnumber(event) {
        this.setState({ curriculum_number: event.target.value });
    }
    
    render(){
        let curriculum_number;
        if(this.props.category === 0){
            if(this.props.topic === 0){
                curriculum_number = (
                    <div className="curriculum_number_box">
                        <select name="curriculum_number" className="pulldown" onChange={(event) => { this.setCurriculumnumber(event) }}>
                            <option value="">選択してください</option>
                            <option value="1-1-1">1-1-1</option>
                        </select>
                    </div>
                );
            }else if(this.props.topic === 1){
                curriculum_number = (
                    <div className="curriculum_number_box">
                        <select name="curriculum_number" className="pulldown" onChange={(event) => { this.setCurriculumnumber(event) }}>
                            <option value="">選択してください</option>
                            <option value="2-1-1">2-1-1</option>
                        </select>
                    </div>
                );
            }else if(this.props.topic === 2){
                curriculum_number = (
                    <div className="curriculum_number_box">
                        <select name="curriculum_number" className="pulldown" onChange={(event) => { this.setCurriculumnumber(event) }}>
                            <option value="">選択してください</option>
                            <option value="2-1-2">2-1-2</option>
                        </select>
                    </div>
                );
            }else if(this.props.topic === 3){
                curriculum_number = (
                    <div className="curriculum_number_box">
                        <select name="curriculum_number" className="pulldown" onChange={(event) => { this.setCurriculumnumber(event) }}>
                            <option value="">選択してください</option>
                            <option value="2-1-3">2-1-3</option>
                        </select>
                    </div>
                );
            }else if(this.props.topic === 4){
                curriculum_number = (
                    <div className="curriculum_number_box">
                        <select name="curriculum_number" className="pulldown" onChange={(event) => { this.setCurriculumnumber(event) }}>
                            <option value="">選択してください</option>
                            <option value="3-1-1">3-1-1</option>
                        </select>
                    </div>
                );
            }else if(this.props.topic === 5){
                curriculum_number = (
                    <div className="curriculum_number_box">
                        <select name="curriculum_number" className="pulldown" onChange={(event) => { this.setCurriculumnumber(event) }}>
                            <option value="">選択してください</option>
                            <option value="4-1-1">4-1-1</option>
                            <option value="4-1-2">4-1-2</option>
                            <option value="4-1-3">4-1-3</option>
                            <option value="4-1-4">4-1-4</option>
                        </select>
                    </div>
                );
            }else if(this.props.topic === 6){
                curriculum_number = (
                    <div className="curriculum_number_box">
                        <select name="curriculum_number" className="pulldown" onChange={(event) => { this.setCurriculumnumber(event) }}>
                            <option value="">選択してください</option>
                            <option value="5-1-1">5-1-1</option>
                            <option value="8-1-1">8-1-1</option>
                            <option value="8-2-1">8-2-1</option>
                            <option value="8-3-1">8-3-1</option>
                            <option value="8-4-1">8-4-1</option>
                            <option value="8-5-1">8-5-1</option>
                            <option value="8-6-1">8-6-1</option>
                        </select>
                    </div>
                );
            }else if(this.props.topic === 7){
                curriculum_number = (
                    <div className="curriculum_number_box">
                        <select name="curriculum_number" className="pulldown" onChange={(event) => { this.setCurriculumnumber(event) }}>
                            <option value="">選択してください</option>
                            <option value="6-1-1">6-1-1</option>
                            <option value="6-2-1">6-2-1</option>
                        </select>
                    </div>
                );
            }else if(this.props.topic === 8){
                curriculum_number = (
                    <div className="curriculum_number_box">
                        <select name="curriculum_number" className="pulldown" onChange={(event) => { this.setCurriculumnumber(event) }}>
                            <option value="">選択してください</option>
                            <option value="7-1-1">7-1-1</option>
                        </select>
                    </div>
                );
            }else{
                curriculum_number = (
                    <div className="curriculum_number_box">
                        <div>トピックを選択し直してください。</div>
                    </div>
                );
            }
            
        }else if(this.props.category === 1){
            curriculum_number = (
                <div className="curriculum_number_box">
                    <select name="curriculum_number" className="pulldown" onChange={(event) => { this.setCurriculumnumber(event) }}>
                        <option value="">選択してください</option>
                        <option value="成果物">成果物</option>
                    </select>
                </div>
            );
        }
         
        return (
            <div className="content">
                <h2 className="step">STEP3 該当カリキュラム番号を選択してください。（任意）</h2>
                { curriculum_number }
                { this.props.setCurriculumnumber(this.state.curriculum_number) }
                
            </div>
        );
    }
}

export default CrriculumNumber;