<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'aaaa',
            'password' => Hash::make('aaaaaaaa'),
            'is_admin' => 'staff',
        ]);
    }
}
