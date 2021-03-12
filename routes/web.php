<?php

use Illuminate\Support\Facades\Route;

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
    return view('welcome');
});
Route::get('/{any}', function () {
    return view('welcome');
});
Route::get('/{any}/{id}', function () {
    return view('welcome');
});

Route::get('/project/task/get', 'TaskController@index');
Route::get('/project/task/edit/{id}', 'TaskController@edit');
Route::post('/project/task/update', 'TaskController@update');
Route::post('/project/task/store', 'TaskController@store');
Route::post('/project/task/delete', 'TaskController@delete');
Route::get('/project/task/search/{search}', 'TaskController@search');