<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('root');
});

Route::get('/assets/{file}', function (Request $request, $file) {
    return Storage::disk('assets')->get($file);
});

Route::get('/assets/fonts/{file}', function (Request $request, $file) {
    return Storage::disk('assets')->get('fonts/' . $file);
});

Route::get('/assets/images/{file}', function (Request $request, $file) {
    return Storage::disk('assets')->get('images/' . $file);
});