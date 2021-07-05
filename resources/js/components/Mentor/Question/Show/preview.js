import React from 'react';
import ReactDOM from 'react-dom';


class Preview extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
        };
    }
    
    render(){
        let images;
        if(this.props.images.filter(v=>v).length === 0){
            images = ('');
        }else{
            images = this.props.images.map((image) => {
                return (
                    <div>
                        <h2 className="columns">参考画像</h2>
                        <a href={image.image_path} data-lightbox="group"><img src={image.image_path} className="image"/></a>
                    </div>
                );
            });
        }
        
        let documents;
        if(this.props.documents.filter(v=>v).length === 0){
            documents = (<div className="preview_emptyMessage">関連する記事はありません。</div>);
        }else{
            documents = this.props.documents.map((document) => {
                return (
                    <div>
                        <div className="document">
                            <img className="document_img" src="/images/NotePM_Logo_Vertical.png"/>
                            <div className="document_title">{ document.title }</div>
                        </div>
                    </div>
                );
            });
        }
        
        return (
            <div>
                <div className="box">
                    <h1 className="title">質問概要</h1>
                    <div className="question">
                        <div className="table">
                            <div className="show_result_nav">
                                <div className="columns category_column pc">カテゴリー</div>
                                <div className="parameters category_parameter pc">{ this.props.category }</div>
                                <div className="columns topic_column pc">トピック</div>
                                <div className="parameters topic_parameter pc">{ this.props.topic }</div>
                                <div className="columns curriculum_number_column pc">カリキュラム番号</div>
                                <div className="parameters curriculum_number_parameter pc">{ this.props.question.curriculum_number }</div>
                            </div>
                            <div className="sp">
                                <div className="show_result_nav_pc">
                                    <div className="columns category_column">カテゴリー</div>
                                    <div className="parameters category_parameter">{ this.props.category }</div>
                                </div>
                                <div className="show_result_nav_pc">
                                    <div className="columns topic_column">トピック</div>
                                    <div className="parameters topic_parameter">{ this.props.topic }</div>
                                </div>
                                <div className="show_result_nav_pc">
                                    <div className="columns curriculum_number_column">カリキュラム番号</div>
                                    <div className="parameters curriculum_number_parameter">{ this.props.question.curriculum_number }</div>
                                </div>
                            </div>
                        </div>
                            
                        <div className="illusts">
                            <div className="question_illust">
                                <img className="student_img" src="/images/pose_english_shrug_man.png"/>
                                <div className="question_balloon">{ this.props.question.question }</div>
                            </div>
                        
                            { images }
                    
                            <div className="comment_illust">
                                <div className="comment_balloon">{ this.props.question.comment }</div>
                                <img className="mentor_img" src="/images/images.jpg"/>
                            </div>
                        </div>
                    </div>
                
                    <h1 className="title">関連記事</h1>
                    <div className="documents">
                        { documents }
                    </div>
                </div>
            </div>
        );
    }
}

export default Preview;
