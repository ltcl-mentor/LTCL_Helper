<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

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
            'name' => "test-user",
            'password' => Hash::make(ENV('seederStudentPassword')),
            'is_admin' => '',
        ]);
    }
}
