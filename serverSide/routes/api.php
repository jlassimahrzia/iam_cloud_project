<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Http\Controllers\AccessTokenController;

/*Route::post('login', [AccessTokenController::class, 'issueToken'])
    ->middleware(['api-login', 'throttle']);
Route::post('/register', 'App\Http\Controllers\UserController@register');*/

// Register
Route::post('register',  'App\Http\Controllers\UserController@register');

// Login
Route::post('login', 'App\Http\Controllers\UserController@login');

Route::middleware(['auth:api'])->group(function () {

    Route::get('connected_user', 'App\Http\Controllers\UserController@authenticatedUserDetails');
    Route::post('logout', 'App\Http\Controllers\UserController@logout');

    /**
     * CRUD User
     */
    Route::put('update_user/{id}', 'App\Http\Controllers\UserController@update');
    Route::delete('delete_user/{id}', 'App\Http\Controllers\UserController@delete');
    Route::get('get_user/{id}', 'App\Http\Controllers\UserController@get_user_by_id');
    Route::get('user_list', 'App\Http\Controllers\UserController@list');

    /**
     * Role
     */
    Route::post('assign_role_user', 'App\Http\Controllers\RolePermissionController@assign_role_to_user');
    Route::post('create_new_role', 'App\Http\Controllers\RolePermissionController@create_new_role');
    Route::get('roles_list', 'App\Http\Controllers\RolePermissionController@roles_list');


    /**
     * Permission
     */
    Route::post('create_permission_with_role', 'App\Http\Controllers\RolePermissionController@create_permission_assign_role_to_permission');
    Route::post('create_permission', 'App\Http\Controllers\RolePermissionController@create_permission');
    Route::delete('delete_role/{id}', 'App\Http\Controllers\RolePermissionController@delete_role');
    Route::get('permissions_list', 'App\Http\Controllers\RolePermissionController@permissions_list');
});
