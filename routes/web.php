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
Route::get('/','CrudController@index');
Route::get('/dtTableCategory','CrudController@dtTableCategory');
Route::post('/storeCategory','CrudController@storeCategory');
Route::get('/editCategory/{id}','CrudController@editCategory');
Route::post('/updateCategory','CrudController@updateCategory');
Route::post('/deleteCategory','CrudController@deleteCategory');
