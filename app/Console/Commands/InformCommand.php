<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\College;

class InformCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:inform';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Inform the attendance mentor to Slack.';

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
        College::informSlack();
    }
}
