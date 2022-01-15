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
            'name' => ENV('seederName'),
            'password' => Hash::make(ENV('seederPassword')),
            'is_admin' => 'staff',
        ]);
        DB::table('users')->insert([
            'name' => "受講生",
            'password' => Hash::make(ENV('seederPassword')),
            'is_admin' => '',
        ]);
    }
}
