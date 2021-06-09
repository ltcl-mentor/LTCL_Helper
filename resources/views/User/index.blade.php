@extends('layouts.app')

@section('content')    
    <!--CSS-->
    <link href="{{ asset('css/Mentor/users.css') }}" rel="stylesheet">
    
    <!--HTML-->
    <div class="container">
        <div><a href="/mentor">管理ページ</a> > ユーザー一覧</div>
        <div class="staffs">
            <h1>スタッフ</h1>
            <div class="count">（{{ count($staffs) }}名）</div>
            <table class="staff">
                <thead>
                    <tr>
                        <th>NO.</th>
                        <th>名前</th>
                        <th>削除</th>
                    </tr>
                </thead>
                <tbody>
                    <?php $i=1?>
                    @foreach($staffs as $staff)
                        <tr>
                            <th>{{ $i }}</th>
                            <td>{{ $staff->name }}</td>
                            <td>
                                <form action="/users/{{ $staff->id }}/delete" method="post" id="delete">
                                    @csrf
                                    <input type="submit" class="hidden">
                                    <p onclick="deleteConfirm()" class="deleteBtn">削除する</p>
                                </form>
                            </td>
                        </tr>
                        <?php $i +=1?>
                    @endforeach
                </tbody>
            </table>
            
        </div>
        <div class="publics">
            <h1>一般</h1>
            <div class="count">（{{ count($students) }}名）</div>
            <table class="public">
                <thead>
                    <tr>
                        <th>NO.</th>
                        <th>名前</th>
                        <th>パスワード</th>
                        <th>削除</th>
                    </tr>
                </thead>
                <tbody>
                    <?php $i=1?>
                    @foreach($students as $student)
                        <tr>
                            <th>{{ $i }}</th>
                            <td>{{ $student->name }}</td>
                            <td>{{ $student->password }}</td>
                            <td>
                                <form action="/users/{{ $student->id }}/delete" method="post" id="delete_{{ $student->id }}">
                                    @csrf
                                    <input type="submit" class="hidden">
                                    <p onclick="indexDeleteConfirm({{ $student->id }})" class="deleteBtn">削除する</p>
                                </form>
                            </td>
                        </tr>
                        <?php $i +=1?>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
@endsection
