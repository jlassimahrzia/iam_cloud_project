<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function list()
    {
        $users = User::with('roles')->get();
        return $users;
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstname' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8']
        ]);
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }
        $user = User::create([
            'firstname' => $request->json()->get('firstname'),
            'lastname' => $request->json()->get('lastname'),
            'email' => $request->json()->get('email'),
            'password' => Hash::make($request->json()->get('password')),
        ]);
        $response = ['message' => 'You have been successfully signing up!'];
        return response($response, 200);
    }

    public function login(Request $request)
    {
        $login_credentials = [
            'email' => $request->email,
            'password' => $request->password,
        ];
        if (auth()->attempt($login_credentials)) {
            //generate the token for the user

            $user = User::find(auth()->user()->id);
            $user_login_token = $user->createToken('THIS_IS_OUR_SECRET_KEY')->accessToken;

            $user_role = $user->getRoleNames(); // get first role

            //now return this token on success login attempt
            return response()->json(['token' => $user_login_token, 'user' => $user], 200);
        } else {
            //wrong login credentials, return, user not authorised to our system, return error code 401
            return response()->json(['error' => 'Unauthorised Access'], 401);
        }
    }

    public function logout(Request $request)
    {
        $accessToken = $request->user()->token();
        DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);
        $accessToken->revoke();
        $response = ['message' => 'You have been successfully logged out!'];
        return response($response, 200);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (isset($user)) {
            $validator = Validator::make($request->all(), [
                'firstname' => ['required', 'string', 'max:255'],
                'lastname' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id],
            ]);
            if ($validator->fails()) {
                return response(['errors' => $validator->errors()->all()], 422);
            }
            $user->update([
                'firstname' => $request->json()->get('firstname'),
                'lastname' => $request->json()->get('lastname'),
                'email' => $request->json()->get('email'),
            ]);
            return response()->json([
                'msg' => 'User successfully updated',
                'user' => $user
            ], 200);
        } else return response()->json(['msg' => "User not found"], 200);
    }

    public function delete($id)
    {
        $user = User::find($id);
        if (isset($user)) {
            $user->delete();
            return response()->json(['msg' => "User successfully deleted"], 200);
        } else return response()->json(['msg' => "User not found"], 200);
    }

    public function get_user_by_id($id)
    {
        $user = User::find($id);
        if (isset($user)) {
            return response()->json(['user' => $user], 200);
        } else return response()->json(['msg' => "User not found"], 200);
    }

    /**
     * returns authenticated user details
     */
    public function authenticatedUserDetails()
    {
        // user with role
        $user = User::find(Auth::user()->id);
        $user_role = $user->getRoleNames(); // get first role
        return response()->json([
            'user' => $user,
            'role' => $user_role
        ], 200);
    }
}
