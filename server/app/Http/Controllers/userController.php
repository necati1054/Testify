<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class userController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['userPasswordUpdate']]);
    }

    public function userUpdate($id, Request $request)
    {
        $user = User::where('id', $id)->first();
        if ($request->email != null) {
            $user->email = $request->email;
        }
        if ($request->surname != null) {
            $user->surname = $request->surname;
        }
        if ($request->name != null) {
            $user->name = $request->name;
        }
        if ($request->password != null) {
            $user->password = bcrypt($request->password);
        }
        $user->save();
        return response()->json($user);
    }

    public function userPasswordUpdate($id, Request $request)
    {
        $user = User::where('id', $id)->first();
        if ($request->oldPassword != null && $request->newPassword != null) {
            if (password_verify($request->oldPassword, $user->password)) {
                $user->password = bcrypt($request->newPassword);
                $user->save();
                return response()->json($user);
            } else {
                return response()->json(['error' => 'Old password is wrong', 'status' => 401], 401);
            }
        } else {
            return response()->json(['error' => 'Please fill in all fields', 'status' => 401], 401);
        }
    }

    public function deleteAccount(
        $id,
        Request $request
    ) {
        $user = User::where('id', $id)->first();
        $user->delete();
        return response()->json(['message' => 'User deleted successfully'], 200);
    }
}
