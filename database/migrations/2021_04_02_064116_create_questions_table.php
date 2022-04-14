<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsTable extends Migration
{
    // 質問
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->UnsignedTinyInteger('category'); // カリキュラムか成果物か
            $table->UnsignedTinyInteger('topic');    // 質問のトピック
            $table->string('curriculum_number', 5);
            $table->string('title', 50);
            $table->string('remarks', 255);          // 試したこと
            $table->longtext('question');
            $table->boolean('is_resolved');          // 解決済みかどうか
            $table->boolean('check');                // 公開非公開
            $table->UnsignedBigInteger('user_id');
            $table->unsignedInteger("status");       // 質問のステータス（メンターの質問引き継ぎ用）
            $table->timestamps();
            $table->softDeletes();
            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questions');
    }
}
