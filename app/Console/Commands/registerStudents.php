<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\User;

class registerStudents extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:register';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Student registration';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        User::registerStudents();
    }
}
