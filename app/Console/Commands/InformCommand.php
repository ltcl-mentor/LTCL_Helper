<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Slack;

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
    protected $description = 'Informing todays college information';

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
        Slack::dailyInform();
    }
}
