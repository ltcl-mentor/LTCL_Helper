<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use DateTime;

class InfoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $date = new DateTime();
        DB::table('infos')->insert([
            'id' => 1,
            'date' => $date->format("Y-m-d"),
            'information' => "LTCL Helperサービス開始しました。",
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
    }
}
