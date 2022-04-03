<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\User;

class DeleteGraduatesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:deleteGraduates';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "delete graduate's data from users and students table.";

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
        User::deleteGraduates();
    }
}
