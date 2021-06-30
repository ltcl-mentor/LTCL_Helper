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
                        <h2 className="preview_columns">参考画像</h2>
                        <a href={image.image_path} data-lightbox="group"><img src={image.image_path} className="preview_image"/></a>
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
                        <div className="preview_document">
                            <img className="preview_document_img" src="/images/NotePM_Logo_Vertical.png"/>
                            <div className="preview_document_title">{ document.title }</div>
                        </div>
                    </div>
                );
            });
        }
        
        return (
            <div>
                <div className="box">
                    <h1 className="preview_title">質問概要</h1>
                    <div className="preview_question">
                        <div className="preview_table">
                            <div>
                                <div className="preview_columns preview_category_column">カテゴリー</div>
                                <div className="preview_parameters preview_category_parameter">{ this.props.category }</div>
                                <div className="preview_columns preview_topic_column">トピック</div>
                                <div className="preview_parameters preview_topic_parameter">{ this.props.topic }</div>
                                <div className="preview_columns preview_curriculum_number_column">カリキュラム番号</div>
                                <div className="preview_parameters preview_curriculum_number_parameter">{ this.props.question.curriculum_number }</div>
                            </div>
                        </div>
                            
                        <div className="preview_illusts">
                            <div className="preview_question_illust">
                                <img className="preview_student_img" src="/images/pose_english_shrug_man.png"/>
                                <div className="preview_question_balloon">{ this.props.question.question }</div>
                            </div>
                        
                            { images }
                    
                            <div className="preview_comment_illust">
                                <img className="preview_mentor_img" src="/images/images.jpg"/>
                                <div className="preview_comment_balloon">{ this.props.question.comment }</div>
                            </div>
                        </div>
                    </div>
                
                    <h1 className="preview_title">関連記事</h1>
                    <div className="preview_documents">
                        { documents }
                    </div>
                </div>
            </div>
        );
    }
}

export default Preview;
