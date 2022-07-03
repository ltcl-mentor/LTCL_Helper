<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Document;
use App\Models\User;
use App\Models\Student;
use App\Models\Image;
use App\Models\Info;
use App\Models\Weather;
use App\Models\College;
use App\Models\Comment;
use App\Models\Event;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class ReactController extends Controller
{

    /** 質問関連 */

    /**
     * メンターが対応するべき質問の受け渡し
     */
    public function getQuestionsForMentor()
    {
        return Question::questionsForMentorPaginate();
    }

    /**
     * 質問検索結果の受け渡し
     * 「絞り込み」と「フリーワード」両方に対応
     */
    public function getSearchQuestions(Request $request)
    {
        return Question::conditionSearch(
            // 絞り込み検索用
            $request->category, $request->topic, $request->curriculum_number, $request->keyword,
            // フリーワード検索用
            $request->searchType, urldecode($request->freeword)
        );
    }

    /**
     * 質問検索結果の受け渡し
     * 「絞り込み」と「フリーワード」両方に対応
     * ペジネーションで受け渡す
     */
    public function getSearchQuestionsPaginate(Request $request)
    {
        return Question::conditionSearchPaginate(
            // 絞り込み検索用
            $request->category, $request->topic, $request->curriculum_number, $request->keyword,
            // フリーワード検索用
            $request->searchType, urldecode($request->freeword),
            //管理者か確認
            $request->admin,
            //ステータスを取得
            $request->status
        );
    }

    /**
     * 全質問受け渡し
     */
    public function getAllQuestions()
    {
        return Question::All();
    }

    /**
     * 個別質問データの受け渡し
     */
    public function getQuestion(Question $question)
    {
        $questionWithAuthor = $question->setAuthor();

        return Comment::setComment($questionWithAuthor);
    }

    /**
     * 公開中の個別質問データの受け渡し
     */
    public function getCheckedQuestion(Question $question)
    {
        if($question->check == true){
            return Comment::setComment($question);
        }

        return null;
    }

    /**
     * マイページの質問データの受け渡し
     */
    public function getMyQuestion(Question $question)
    {
        return Comment::setComment($question);
    }

    /**
     * 公開中の全質問受け渡し
     */
    public function getCheckedQuestions()
    {
        return Question::where('check', true)->get();
    }

    // /**
    //  * 未承認質問受け渡し
    //  */
    // public function getUnapprovedQuestions()
    // {
    //     return Question::where('check', false)->get();
    // }

    /**
     * カリキュラム範囲の全質問受け渡し
     */
    public function getCurriculumQuestions()
    {
        return Question::where('category', 0)->get();
    }

    /**
     * 成果物範囲の全質問受け渡し
     */
    public function getPortfolioQuestions()
    {
        return Question::where('category', 1)->get();
    }

    /**
     * 個別記事に関連する全質問受け渡し
     */
    public function getRelatedQuestions(Document $document)
    {
        return $document->questions()->get();
    }

    /**
     * カテゴリーに応じたメンターコメント待ちの質問受け渡し
     */
    public function getMentorYetCommentQuestions($category)
    {
        $unresolved_questions = Question::where('category', $category)->where('is_resolved', false)->get();

        $mentor_yet_comment_questions = [];

        foreach($unresolved_questions as $question){
            $mentor_yet_comment_counts = Comment::where('question_id', $question->id)->where('is_mentor_commented', false)->count();

            if($mentor_yet_comment_counts !== 0){
                array_push($mentor_yet_comment_questions, $question);
            }
        }

        return $mentor_yet_comment_questions;
    }

    /**
     * カテゴリーに応じた受講生コメント待ちの質問受け渡し
     */
    public function getStudentYetCommentQuestions($category)
    {
        $unresolved_questions = Question::where('category', $category)->where('is_resolved', false)->get();

        $student_yet_comment_questions = [];

        foreach($unresolved_questions as $question){
            $student_yet_comments = Comment::where('question_id', $question->id)->where('is_mentor_commented', true)->get();

            if(count($student_yet_comments) !== 0){
                array_push($student_yet_comment_questions, $question);
            }
        }

        return $student_yet_comment_questions;
    }

    /**
     * 未解決でメンターまたは受講生のコメント入力待ちの件数受け渡し
     */
    public function getQuestionYetCounts()
    {
        $unresolved_questions = Question::where('is_resolved', false)->get();

        $mentor_yet_comment_count = 0;
        $student_yet_comment_count = 0;

        foreach($unresolved_questions as $question){
            $mentor_yet_comments = Comment::where('question_id', $question->id)->where('is_mentor_commented', false)->get();
            $student_yet_comments = Comment::where('question_id', $question->id)->where('is_mentor_commented', true)->get();

            $mentor_yet_comment_count += count($mentor_yet_comments);
            $student_yet_comment_count += count($student_yet_comments);
        }

        return ["mentor" => $mentor_yet_comment_count, "student" => $student_yet_comment_count];
    }

    /**
     * ログインユーザの質問一覧受け渡し
     */
    public function getMyQuestions()
    {
        return Question::getMyQuestions();
    }

    // /**
    //  * 質問に関連する全画像の受け渡し
    //  */
    // public function getImages($question_id)
    // {
    //     return Image::where('question_id', $question_id)->get();
    // }



    /** 参考記事関連 */

    /**
     * 全記事受け渡し
     */
    public function getAlldocuments()
    {
        return Document::get();
    }

    /**
     * 個別記事データの受け渡し
     */
    public function getDocument(Document $document)
    {
        return $document->setAuthor();
    }

    /**
     * 個別質問に関連する全記事受け渡し
     */
    public function getRelatedDocuments(Question $question, Request $request)
    {

        return $question->documents()->get();
    }

    /**
     * topicごとの全記事受け渡し
     */
    public function getRelatedDocumentsPaginate($category)
    {
        $document = Document::where('category', $category);
        return $document->paginate(9);
    }



    /** ユーザ関連 */

    /**
     * 全管理者受け渡し
     */
    // public function getAllStaffs()
    // {
    //     return User::where('is_admin','staff')->get();
    // }

    /**
     * 全受講生受け渡し
     */
    // public function getAllStudents()
    // {
    //     $students = User::getAllStudentsName();
    //     return $students;
    // }



    /** ログインユーザー情報 */

    /**
     * ログインユーザーid受け渡し
     */
    public function getUserId()
    {
        return Auth::id();
    }

    /**
     * ログインユーザデータ受け渡し
     */
    public function getUser()
    {
        return User::getUser();
    }



    /** home画面関連 */

    /**
     * 今日の天気のデータ受け渡し
     */
    public function getWeather()
    {
        return Weather::getWeatherData();
    }


    /**
     * URLで指定された日付の校舎情報受け渡し
     */
    public function getCollegeData($year, $month, $date)
    {
        return College::getCollegeData($year, $month, $date);
    }


    /**
     * 記録されているお知らせの受け渡し
     */
    public function getInfos()
    {
        $infos = Info::getInfo();
        return ["infos" => $infos, "events" => Event::get()];
    }

    /**
     * 全イベントの受け渡し
     */
    // public function getAllEvents()
    // {
    //     return Event::get();
    // }

    /**
     * 管理画面へイベント、受講生、スタッフ情報を受け渡す
     */
    public function getAllMentorInfo()
    {
        $events = Event::get();
        $staffs = User::where('is_admin','staff')->paginate(10);
        $students = User::getAllStudentsName();

        return compact('events', 'staffs', 'students');
    }

    /**
     * 個別イベントの受け渡し
     */
    public function getOneEvent(Event $event)
    {
        return $event;
    }

    /**
     * slackリアクションの参考サイトの受け渡し
     */
    public function getReaction()
    {
        return env('slackEmoji');
    }

    /**
     * 各トピックの質問数と関連記事数を取得
     */
    public function getQuestionArticle()
    {
        $achievement = Question::getAchievement();
        $curriculum_questions = [];
        $project_questions = [];
        $questions = array_count_values(Question::where('check', 1)->pluck('topic')->all());
        $documents = array_count_values(Document::pluck('category')->all());

        // 質問、関連記事カウント
        for ($i=0; $i <= 19; $i++) {
            $question_count = 0;
            $document_count = 0;

            if (array_key_exists($i, $questions)) {
                $question_count = $questions[$i];
            }

            if (array_key_exists($i, $documents)) {
                $document_count = $documents[$i];
            }

            if ($i <= 13) {  // カリキュラム
                array_push($curriculum_questions, ['topic' => $i, 'questions' => $question_count, 'documents' => $document_count]);
            } else {         // 成果物
                array_push($project_questions, ['topic' => $i, 'questions' => $question_count, 'documents' => $document_count]);
            }
        }

        return ['curriculum' => $curriculum_questions, "project" => $project_questions, 'achievement' => $achievement];
    }
}
