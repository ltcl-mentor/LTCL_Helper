<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Document;
use App\Image;
use App\Comment;
use App\Export;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Question extends Model
{
    use SoftDeletes;

    protected $fillable = ['category', 'topic', 'curriculum_number', 'title', 'remarks', 'question', 'is_resolved', 'check', 'user_id'];

    static $category = ['カリキュラム', '成果物'];

    static $topic = ['AWS', 'HTML', 'CSS', 'JavaScript', 'サーバー', 'PHP', 'Laravel', 'DB', 'Git&GitHub', 'マイグレーション', 'リレーション', 'Laravel拡張', '画像処理', 'Heroku環境', 'API', 'デザイン'];

    /**
     * リレーション関係
     */
    public function documents()
    {
        return $this->belongsToMany('App\Document');
    }

    public function users()
    {
        return $this->belongsToMany('App\User')->withTimestamps();
    }

    /**
     * ログインユーザの質問一覧取得
     */
    public static function getMyQuestions()
    {
        $my_questions = self::where('user_id', Auth::id())->get();

        foreach($my_questions as $question){
            $student_yet_comments = Comment::where('question_id', $question->id)->where('is_mentor_commented', true)->get();

            $question->reply = count($student_yet_comments) !== 0 ? true : false;
        }

        return $my_questions;
    }

    /**
     * 実行対象の質問データに関連する記事の全ID取得
     */
    public function getRelatedDocumentsIds(){
        $related_documents = $this->documents()->get(['document_id'])->toArray();
        $related_document_ids = [];

        foreach($related_documents as $document){
            $related_document_ids[] = $document['document_id'];
        }

        return $related_document_ids;
    }

    /**
     * 実行対象の質問に対してまだ紐付けがされていない全記事を取得
     */
    public function getUnrelatedDocuments()
    {
        $related_document_ids = $this->documents()->select('document_id')->get();
        // 取得したidを配列に変換
        foreach($related_document_ids as $related_document_id){
            $related_ids_array[] = $related_document_id['document_id'];
        }
        // 紐付けがすでに行われているデータ以外(まだ紐付けのできていないデータ)を取得
        return Document::whereNotIn('id', $related_ids_array)->get();
    }

    /**
     * 質問のデータの物理削除の実行
     * （対象：論理削除から３ヶ月が経過したもの）
     */
    public static function questionForceDelete()
    {
        $deleted_questions = self::onlyTrashed()->get();

        $today = date("Y-m-d H:i:s");

        foreach($deleted_questions as $deleted_question){
            $month_diff = $deleted_question['deleted_at']->diffInMonths($today);
            // 論理削除されてから３ヶ月以上経過していた場合に物理削除を実行
            if($month_diff > 3){
                // 関連画像の削除
                $used_images = Image::where('question_id', $question->id)->get(['image_path']);

                $delete_images = [];

                if(count($used_images) !== 0){
                    foreach($used_images as $used_image){
                        array_push($delete_images, $used_image->image_path);
                    }
                }

                Image::imageDelete($delete_images);

                // 物理削除実行
                $deleted_question->forceDelete();
            }
        }
    }

    /**
     * 質問の検索
     * 「絞り込み」「キーザード」共通
     */
    public static function conditionSearch($category, $topic, $curriculum_number, $keyword, $searchType, $freeword)
    {
        if($freeword){
            // フリーワード検索
            // 検索ワードが複数の場合に要素を配列に変換し、空文字列の要素を排除
            $freewords = explode("/", $freeword);
            $noEmptyFreewords = array_filter($freewords);

            if($searchType === "OR"){
                // OR検索
                // 複数の検索ワードのいづれかに該当するものを選出
                $results = self::where('check', true)
                        ->where(function ($query) use ($noEmptyFreewords) {
                            $i = 0;
                            foreach ($noEmptyFreewords as $searchFreeword) {
                                $where = (!$i) ? 'where' : 'orWhere';
                                $i++;
                                $query->$where('question', 'ilike', '%'.$searchFreeword.'%');
                            }
                        });
            }else{
                // AND検索
                $basic_data = self::where('check', true);

                // 複数の検索ワードの全てに該当するものを選出
                foreach($noEmptyFreewords as $searchWord){
                    $basic_data->where('question', 'ilike', '%'.$searchWord.'%');
                };
                $results = $basic_data;
            }

        }else{
            // 絞り込み検索
            $basic_data = self::where('check', true)
                        ->where('category', $category)
                        ->where('topic', $topic);

            if($keyword && $curriculum_number){
                $results = $basic_data
                        ->where('curriculum_number', $curriculum_number)
                        ->where('question', 'ilike', '%'.$keyword.'%');

            }elseif($curriculum_number){
                $results = $basic_data->where('curriculum_number', $curriculum_number);

            }elseif($keyword){
                $results = $basic_data->where('question', 'ilike', '%'.$keyword.'%');

            }else{
                $results = $basic_data;
            }
        }

        return $results->orderBy('question', 'asc')->get();
    }

    public static function conditionSearchPaginate($category, $topic, $curriculum_number, $keyword, $searchType, $freeword)
    {
        if($freeword){
            // フリーワード検索
            // 検索ワードが複数の場合に要素を配列に変換し、空文字列の要素を排除
            $freewords = explode("/", $freeword);
            $noEmptyFreewords = array_filter($freewords);

            if($searchType === "OR"){
                // OR検索
                // 複数の検索ワードのいづれかに該当するものを選出
                $results = self::where('check', true)
                    ->where(function ($query) use ($noEmptyFreewords) {
                        $i = 0;
                        foreach ($noEmptyFreewords as $searchFreeword) {
                            $where = (!$i) ? 'where' : 'orWhere';
                            $i++;
                            $query->$where('question', 'ilike', '%'.$searchFreeword.'%');
                        }
                    });
            }else{
                // AND検索
                $basic_data = self::where('check', true);

                // 複数の検索ワードの全てに該当するものを選出
                foreach($noEmptyFreewords as $searchWord){
                    $basic_data->where('question', 'ilike', '%'.$searchWord.'%');
                };
                $results = $basic_data;
            }

        }else{
            // 絞り込み検索
            $basic_data = self::where('check', true)
                ->where('category', $category)
                ->where('topic', $topic);

            if($keyword && $curriculum_number){
                $results = $basic_data
                    ->where('curriculum_number', $curriculum_number)
                    ->where('question', 'ilike', '%'.$keyword.'%');

            }elseif($curriculum_number){
                $results = $basic_data->where('curriculum_number', $curriculum_number);

            }elseif($keyword){
                $results = $basic_data->where('question', 'ilike', '%'.$keyword.'%');

            }else{
                $results = $basic_data;
            }
        }

        return $results->orderBy('question', 'asc')->paginate(10);
    }

    /**
     * 受講生がコメントに未返信の質問の件数取得
     */
    public static function replyCheck()
    {
        $unresolved_questions = Self::where('user_id', Auth::id())->where('is_resolved', false)->get();

        $student_yet_comment_count = 0;

        foreach($unresolved_questions as $question){
            $student_yet_comments = Comment::where('question_id', $question->id)->where('is_mentor_commented', true)->get();

            $student_yet_comment_count += count($student_yet_comments);
        }

        return $student_yet_comment_count;
    }

    /**
     * 質問の解決率取得
     */
    public static function getAchievement()
    {
        // 公開済みの質問件数
        $question_checked_count = Question::where('check', true)->count();

        // 公開済みの質問が０件の場合
        if ($question_checked_count === 0)
        {
            return 0;
        }

        // 公開済みかつ解決済み質問件数
        $question_resolved_count = Question::where('check', true)->where('is_resolved', true)->count();

        $ratio = $question_resolved_count/$question_checked_count * 100;

        return round($ratio ,0);
    }

    /**
     * 質問作成者情報を追加
     */
    public function setAuthor()
    {
        $author = User::find($this->user_id);

        if($author){
            $this->author = $author->name;
        }else{
            $this->author = "削除済みユーザー";
        }

        return $this;
    }

    /**
     * レポート作成
     * 前日までで未解決の質問があればSlackに通知
     */
    public static function makeReport()
    {
        $unresolved_questions = Self::where('check', true)->where('is_resolved', false)->get();
        $unresolved_questions_count = count($unresolved_questions);
        if($unresolved_questions_count === 0){
            Slack::sendMessage('未解決の質問はありません。', 'mentor');
        }else{
            $unresolved_questions_list = "";
            foreach($unresolved_questions as $question){
                $unresolved_questions_list .= "https://stark-cliffs-73338.herokuapp.com/public/questions/" . $question->id . "\n";
            }
            Slack::sendMessage("未解決の質問が" . $unresolved_questions_count . "件あります。\n" . $unresolved_questions_list, 'mentor');
        }
    }

    /**
     * CSV出力の告知
     * 前回のCSV出力から規定数の質問が新規に追加された場合にSlackへ通知
     */
    public static function exportCheck()
    {
        $question_count = Question::count();
        $exported_question_count = Export::sum('export_size');

        if($question_count - $exported_question_count >= 95){
            Slack::sendMessage("前回のCSV出力から新たに95件の質問が追加されました。\nmasterアカウントからCSV出力を実行してバックアップを保管してください。", 'mentor');
        }
    }
}
