<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentQuestionTable extends Migration
{
    // 質問と関連記事の中間テーブル
    public function up()
    {
        Schema::create('document_question', function (Blueprint $table) {
            $table->id();
            $table->foreignId('document_id')->constrained();
            $table->foreignId('question_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('document_question');
    }
}
