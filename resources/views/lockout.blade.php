<!-- ユーザーロックアウト画面 -->
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--css responsible-->
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=yes">

    <title>LTCL Helper</title>

    <!--クローラー巡回拒否設定-->
    <meta name="robots" content="noindex">
    <meta name="robots" content="nofollow">

    <!-- Scripts -->

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    {{-- Styles --}}
    <link href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.7.1/css/lightbox.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.7.1/js/lightbox.min.js" type="text/javascript"></script>
</head>

<body>
    <div>
        複数回連続でログインに失敗したためアカウントがロックされました。<br />
        ロックを解除するには、メンターにお問い合わせください。
    </div>
    <a href="/login">ログインページに戻る</a>
</body>
</html>
