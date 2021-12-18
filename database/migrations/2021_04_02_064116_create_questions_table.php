<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->UnsignedTinyInteger('category');
            $table->UnsignedTinyInteger('topic');
            $table->string('curriculum_number', 5);
            $table->string('title', 50);
            $table->string('remarks', 255);
            $table->longtext('question');
            $table->tinyInteger('status');
            $table->boolean('check');
            $table->UnsignedBigInteger('user_id');
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
        Schema::dropIfExists('questions');
    }
}
