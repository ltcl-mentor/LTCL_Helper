<?php

namespace App\Http\Middleware;

use Closure;

class RedirectIfIndexJsMap
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->path() === 'js/index.js.map') {
            return redirect('/');
        }
        return $next($request);
    }
}
