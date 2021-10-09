@extends('layouts.app')

@section('content')
    <!--CSS-->
    
    
    <!--HTML-->
    <form action="/contact/post" method="post">
        @csrf
        <textarea name="message"></textarea>
        <input type="submit">
    </form>
    
@endsection
