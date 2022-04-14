<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(StudentsTableSeeder::class);
        $this->call(QuestionTableSeeder::class);
        $this->call(DocumentTableSeeder::class);
        $this->call(InfoTableSeeder::class);
        $this->call(CommentsTableSeeder::class);
        $this->call(DocumentQuestionTableSeeder::class);
    }
}
