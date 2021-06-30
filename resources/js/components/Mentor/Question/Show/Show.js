import React from 'react';
import ReactDOM from 'react-dom';
import Modal from "react-modal";
import axios from "axios";
import Preview from './preview';
import CheckForm from './checkForm';

Modal.setAppElement("#app");

class Show extends React.Component{
    constructor(props){
        super(props);
        let csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
        this.state={
            question: [],
            staffs: [],
            images: [],
            documents: [],
            modalIsOpen: false,
            csrf_token: csrf_token,
            categories: ['カリキュラム', '成果物'],
            topics: ['AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'DB', 'Git&GitHub', '環境構築', '設計図', 'デプロイ', 'API'],
        };
    }
    
    componentDidMount() {
        const question_id = document.getElementById('Show').getAttribute('question_id');
        axios
            .get(`/react/question/${ question_id }`)
            .then(response => {
                this.setState({
                    question: response.data
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
        axios
            .get(`/react/images/${ question_id }`)
            .then(response => {
                this.setState({
                    images: response.data
                });
                
            }).catch(error => {
                console.log(error);
            });
            
        axios
            .get(`/react/related/documents/${ question_id }`)
            .then(response => {
                this.setState({
                    documents: response.data
                });
                
            }).catch(error => {
                console.log(error);
            });
    }
    
    openModal() {
        this.setState({modalIsOpen: true});
    }
 
    closeModal() {
        this.setState({modalIsOpen: false});
    }
    
    deleteConfirm() {
        "use strict"; 
        if (confirm('データが削除されます。\nよろしいですか？')){
            document.getElementById('delete').submit();
        }else{
            window.alert('キャンセルしました');
            return false;
        }
    }
    unpublishConfirm() {
        "use strict"; 
        if (confirm('質問が非公開になります。\nよろしいですか？')){
            document.getElementById('unpublish').submit();
        }else{
            window.alert('キャンセルしました');
            return false;
        }
    }
    
    
    render(){
        let publishBtn;
        if(this.state.question.check === 0){
            publishBtn = (<div><p onClick={ () => {this.openModal()} } className="publishBtn">公開する</p></div>);
        }else{
            publishBtn = (
                <div>
                    <form action={`/questions/`+this.state.question.id+`/uncheck`} method="post" id="unpublish">
                        <input type="hidden" name="_token" value={ this.state.csrf_token }/>
                        <input type="submit" className="hidden"/>
                        <p className="publishBtn" onClick={() => { this.unpublishConfirm() }}>非公開にする</p>
                    </form>
                </div>
            );
        }
        
        let author;
        if(this.state.question.user_id === 0){
            author = "削除済みユーザー";
        }else{
            author = this.state.staffs.map((staff) => {
                if(staff.id === this.state.question.user_id){
                    return staff.name;
                }
            });
        }
        
        let isPublic;
        if(this.state.question.check === 0){
            isPublic = "非公開";
        }else{
            isPublic = "公開";
        }
        
        let images;
        if(this.state.images.filter(v=>v).length === 0){
            images = (<div className="parameters word">画像はありません</div>);
        }else{
            images = this.state.images.map((image) => {
                return (
                    <div>
                        <a href={image.image_path} data-lightbox="group"><img src={image.image_path} className="image"/></a>
                    </div>
                );
            });
        }
        
        let documents;
        if(this.state.documents.filter(v=>v).length === 0){
            documents = (<div className="emptyMessage">関連する記事はありません。</div>);
        }else{
            documents = this.state.documents.map((document) => {
                return (<div className="document">・<a href={ `/documents/`+document.link }>{ document.title }</a></div>);
            });
        }
        
        return (
            <div className="container">
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={() => { this.closeModal() }}
                >
                    <button onClick={() => { this.closeModal() }}>×</button>
                    <div className="alert">これは公開時のプレビューです。まだ公開処理は完了していません。</div>
                    
                    <CheckForm 
                        question_id={ this.state.question.id }
                        csrf_token={ this.state.csrf_token }
                    />
                    
                    <Preview 
                        question={ this.state.question }
                        images={ this.state.images }
                        documents={ this.state.documents }
                        category={ this.state.categories[this.state.question.category] }
                        topic={ this.state.topics[this.state.question.topic] }
                    />
                    
                </Modal>
                
                <div className="title">
                    <h1>質問詳細</h1>
                    <a href={`/questions/`+this.state.question.id+`/edit`} className="editBtn">編集する</a>
                    <form action={`/questions/`+this.state.question.id+`/delete`} method="post" id="delete">
                        <input type="hidden" name="_token" value={ this.state.csrf_token }/>
                        <input type="submit" className="hidden"/>
                        <p className="deleteBtn" onClick={() => { this.deleteConfirm() }}>削除する</p>
                    </form>
                    { publishBtn }
                </div>
        
                <div className="table">
                    <h2 className="columns">カテゴリー</h2>
                    <div className="parameters word">{ this.state.categories[this.state.question.category] }</div>
            
                    <h2 className="columns">トピック</h2>
                    <div className="parameters word">{ this.state.topics[this.state.question.topic] }</div>
        
                    <h2 className="columns">カリキュラム番号</h2>
                    <div className="parameters word">{ this.state.question.curriculum_number }</div>
        
                    <h2 className="columns">作成者</h2>
                    <div className="parameters word">{ author }</div>
            
                    <h2 className="columns">公開状況</h2>
                    <div className="parameters word">{ isPublic }</div>
        
                    <h2 className="columns">質問内容</h2>
                    <div className="parameters">{ this.state.question.question }</div>
        
                    <h2 className="columns">コメント</h2>
                    <div className="parameters">{ this.state.question.comment }</div>
            
                    <h2 className="columns">関連画像</h2>
                    { images }
                </div>
        
                <div>
                    <div className="title">
                        <h1>関連記事</h1>
                        <a href={`/links/question/`+this.state.question.id }>編集する</a>
                    </div>
                    { documents }
                </div>
            </div>
        );
    }
    
}

export default Show;

if (document.getElementById('Show')) {
    ReactDOM.render(<Show />, document.getElementById('Show'));
}

