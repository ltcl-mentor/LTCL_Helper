<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DocumentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('documents')->insert([
            'id' => 1,
            'title' => 'HTMLの構造とインデント',
            'link' => 'https://notepm.jp/sharing/100d43f4-d91f-42e7-bcd3-6da5a1a48f85',
            'user_id' => 1,
            'beginner' => true,
            'amature' => false,
            'master' => false,
            'all' => false,
            'category' => 1,
        ]);
        DB::table('documents')->insert([
            'id' => 2,
            'title' => 'パスとは',
            'link' => 'https://notepm.jp/sharing/a93bdbf5-f099-47f9-8d01-ffc7cc9dbc15',
            'user_id' => 1,
            'beginner' => true,
            'amature' => false,
            'master' => false,
            'all' => false,
            'category' => 13,
        ]);
        DB::table('documents')->insert([
            'id' => 3,
            'title' => '$argvの使い方',
            'link' => 'https://notepm.jp/sharing/5607fbfe-9f80-444f-b2d9-c13a7efe7528',
            'user_id' => 1,
            'beginner' => false,
            'amature' => true,
            'master' => false,
            'all' => false,
            'category' => 5,
        ]);
        DB::table('documents')->insert([
            'id' => 4,
            'title' => '.envファイルの役割と使い方',
            'link' => 'https://notepm.jp/sharing/a3003b63-e493-4495-b7f8-a52c6ce26ab8',
            'user_id' => 1,
            'beginner' => true,
            'amature' => false,
            'master' => false,
            'all' => false,
            'category' => 6,
        ]);
        DB::table('documents')->insert([
            'id' => 5,
            'title' => '暗号化の仕組み',
            'link' => 'https://notepm.jp/sharing/8ae9cd4b-f37d-43a8-a29d-93e31491fc87',
            'user_id' => 1,
            'beginner' => true,
            'amature' => false,
            'master' => false,
            'all' => false,
            'category' => 13,
        ]);
        DB::table('documents')->insert([
            'id' => 6,
            'title' => 'DB操作',
            'link' => 'https://college-lev.notepm.jp/page/adb6754dcb',
            'user_id' => 1,
            'beginner' => true,
            'amature' => false,
            'master' => false,
            'all' => false,
            'category' => 1,
        ]);
        DB::table('documents')->insert([
            'id' => 7,
            'title' => 'oldメソッドの使い方',
            'link' => 'https://notepm.jp/sharing/d0a2e62b-ca9d-4fcf-9dd2-060497d3a469',
            'user_id' => 1,
            'beginner' => true,
            'amature' => false,
            'master' => false,
            'all' => false,
            'category' => 6,
        ]);
        DB::table('documents')->insert([
            'id' => 8,
            'title' => 'Linuxコマンド',
            'link' => 'https://notepm.jp/sharing/aac2deb8-1bfb-4fd7-918b-a3c5fdc7f5be',
            'user_id' => 1,
            'beginner' => true,
            'amature' => false,
            'master' => false,
            'all' => false,
            'category' => 13,
        ]);
        DB::table('documents')->insert([
            'id' => 9,
            'title' => 'URL内のidの使い方',
            'link' => 'https://notepm.jp/sharing/768abb5f-a043-41f4-aa95-e2e5829f8700',
            'user_id' => 1,
            'beginner' => true,
            'amature' => false,
            'master' => false,
            'all' => false,
            'category' => 6,
        ]);
        DB::table('documents')->insert([
            'id' => 10,
            'title' => 'seederの使い方',
            'link' => 'https://notepm.jp/sharing/a0d17279-169c-431e-b92d-41d07e3d1a34',
            'user_id' => 1,
            'beginner' => false,
            'amature' => true,
            'master' => false,
            'all' => false,
            'category' => 9,
        ]);
        DB::table('documents')->insert([
            'id' => 11,
            'title' => 'メソッドの呼び出し方',
            'link' => 'https://notepm.jp/sharing/562a7014-c2a2-4086-a32a-5e7cd3880c1b',
            'user_id' => 1,
            'beginner' => false,
            'amature' => true,
            'master' => false,
            'all' => false,
            'category' => 5,
        ]);
        DB::table('documents')->insert([
            'id' => 12,
            'title' => '画面表示の仕組み',
            'link' => 'https://notepm.jp/sharing/c442de61-f804-4976-8b99-42e526b83aaa',
            'user_id' => 1,
            'beginner' => true,
            'amature' => false,
            'master' => false,
            'all' => false,
            'category' => 6,
        ]);
        DB::table('documents')->insert([
            'id' => 13,
            'title' => 'URLのhttps化',
            'link' => 'https://notepm.jp/sharing/3ae839a8-2f52-49ca-b563-972c330f6b6d',
            'user_id' => 1,
            'beginner' => true,
            'amature' => false,
            'master' => false,
            'all' => true,
            'category' => 13,
        ]);
        DB::table('documents')->insert([
            'id' => 14,
            'title' => 'バージョンとサポート期間',
            'link' => 'https://notepm.jp/sharing/3ae839a8-2f52-49ca-b563-972c330f6b6d',
            'user_id' => 1,
            'beginner' => false,
            'amature' => true,
            'master' => false,
            'all' => false,
            'category' => 13,
        ]);
    }
}
