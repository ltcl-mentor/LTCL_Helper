<?php

use Illuminate\Database\Seeder;

class DocumentQuestionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('document_question')->insert([
            'document_id' => 4,
            'question_id' => 1,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('document_question')->insert([
            'document_id' => 5,
            'question_id' => 2,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('document_question')->insert([
            'document_id' => 6,
            'question_id' => 4,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('document_question')->insert([
            'document_id' => 3,
            'question_id' => 5,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('document_question')->insert([
            'document_id' => 7,
            'question_id' => 6,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('document_question')->insert([
            'document_id' => 13,
            'question_id' => 14,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        DB::table('document_question')->insert([
            'document_id' => 14,
            'question_id' => 2,
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
    }
}
