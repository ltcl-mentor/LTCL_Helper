<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    // 質問のコメント
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('comment');
            $table->UnsignedBigInteger('question_id');
            $table->UnsignedBigInteger('comment_id');
            $table->UnsignedBigInteger('user_id');
            $table->boolean('is_staff');
            $table->boolean('is_mentor_commented')->nullable(); // メンターが返信したかどうか
            $table->timestamps();
            $table->softDeletes();
            
            $table->foreign('question_id')->references('id')->on('questions')->onDelete('cascade');
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
        Schema::dropIfExists('comments');
    }
}
