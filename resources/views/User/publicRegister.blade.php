@extends('layouts.app')

@section('content')    
    <!--CSS-->
    <link href="{{ asset('css/Mentor/users.css') }}" rel="stylesheet">
    
    <!--HTML-->
    <div class="container">
    <div><a href="/mentor">管理ページ</a> > 受講生の登録</div>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Register(20名まで同時に登録できます)') }}</div>
                
                    <!--React-->
                    <div id="Public"></div>
                    
                </div>
            </div>
        </div>
    </div>
    
    
@endsection
