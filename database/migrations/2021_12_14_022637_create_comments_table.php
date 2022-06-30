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
            $table->id();
            $table->text('comment');
            $table->foreignId('question_id')->constrained();
            $table->UnsignedBigInteger('comment_id');
            $table->foreignId('user_id')->constrained();
            $table->boolean('is_staff');
            $table->boolean('is_mentor_commented')->nullable(); // メンターが返信したかどうか
            $table->timestamps();
            $table->softDeletes();
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
