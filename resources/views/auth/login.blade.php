@extends('layouts.app')

@section('content')
<div class="background" style="width: 100vw; background-image: url('/images/login_image.png'); background-size: cover; bakground-repeat: no-repeat; background-position: center center;">
    <div class="container" style="height: 100vh; display: inline-block;">
                    <div class="form-content" style="margin: 0 auto;">
                        <form method="POST" action="{{ route('login') }}" style="width: 50vw; margin-left: 25vw; height: 50vh; margin-top: 25vh;">
                            @csrf
                            <h1 class="text-center font-weight-bold" style="font-size: 3.5vw; color: #771AF8;">Welcome</h1>
                            <div class="form-group">
                                <p class="font-weight-bold col-md-4" style="margin: 0 auto; color: #771AF8;">{{ __('ID') }}</p>
    
                                <div class="col-md-4 mx-auto">
                                    <input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>
    
                                    @error('name')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>
    
                            <div class="form-group">
                                <p class="font-weight-bold col-md-4" style="margin: 0 auto; color: #771AF8;">{{ __('Password') }}</p>
    
                                <div class="col-md-4 mx-auto">
                                    <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">
    
                                    @error('password')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>
    
                            <div class="form-group row text-align-left">
                                <div class="col-md-4 mx-auto">
                                    <div class="form-check pl-4">
                                        <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
    
                                        <label class="form-check-label" for="remember" style="color: #771AF8">
                                            {{ __('Remember Me') }}
                                        </label>
                                    </div>
                                </div>
                            </div>
    
                            <div class="form-group row mb-0 mx-auto">
                                <div class="col-md-11 mx-auto text-center">
                                    <button type="submit" class="btn pl-1 mx-auto col-md-4 font-weight-bold" style="background: #771AF8; color: white;" onMouseOut="this.style.background='#771AF8'; this.style.color='white';" onMouseOver="this.style.background='rgba(119, 26, 248, 0.7)'; this.style.color='rgba(255,255,255,0.7)';">
                                        {{ __('Login') }}
                                    </button>
    
                                    @if (Route::has('password.request'))
                                        <a class="btn btn-link" href="{{ route('password.request') }}">
                                            {{ __('Forgot Your Password?') }}
                                        </a>
                                    @endif
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
        </div>    
@endsection
