<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentsTable extends Migration
{
    // 関連記事
    public function up()
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->text('title');
            $table->text('link');
            $table->boolean('beginner');
            $table->boolean('amature');
            $table->boolean('master');
            $table->boolean('all');
            $table->foreignId('user_id')->constrained();
            $table->UnsignedTinyInteger('category')->nullable();
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
        Schema::dropIfExists('documents');
    }
}
