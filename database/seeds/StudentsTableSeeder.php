<?php

use Illuminate\Database\Seeder;

class StudentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('students')->insert([
            'name' => 'test-user',
            'password' => ENV('seederPassword'),
            'user_id' => '2',
        ]);
    }
}
