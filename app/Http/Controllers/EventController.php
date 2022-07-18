<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    protected $fillable = ['name', 'template'];

    /**
     * イベント追加処理
     */
    public function store(Request $request, Event $event) {
        Event::create([
            'name' => $request->name,
            'template' => $request->template
        ]);
    }

    /**
     * イベント編集処理
     */
    public function update(Request $request, Event $event) {
        $event->name = $request->name;
        $event->template = $request->template;
        $event->save();
    }

    /**
     * イベント削除処理
     */
    public function delete(Event $event) {
        $event->delete();
    }
}
