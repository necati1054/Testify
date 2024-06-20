<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Password_reset_token;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'resetPassword', 'newPassword']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);
        $user = User::where('email', $request['email'])->first();

        $token = JWTAuth::claims(['user' => $user])->attempt($credentials);
        if (!$token) {
            return response()->json(['error' => 'Unauthorized', 'status' => 401], 401);
        }

        return $this->respondWithToken($token);
    }


    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }


    public function register(Request $request)
    {
        User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'role' => $request->role,
            'password' => bcrypt($request->password),
            'created_at' => now(),
        ]);

        return response()->json(['message' => $request->name . ' User successfully registered'], 201);
    }

    public function resetPassword(Request $request)
    {
        if (!User::where('email', $request->email)->exists()) {
        } else {

            $token = password_reset_token::where('email', $request->email)->first();

            if ($token != null) {
                $this->changePasswordToken($request->email);
                return response()->json(['message' => 'new Password reset token created'], 200);
            }

            $code = Str::random(16);

            password_reset_token::create([
                'email' => $request->email,
                'token' => $code,
                'created_at' => now()
            ]);

            $this->tokenSendEmail($code, $request->email);
        }

        return response()->json(['message' => 'Password reset token created'], 200);
    }


    private function tokenSendEmail($token, $email)
    {
        $to = $email;
        $subject = "Password reset";
        $txt = "Click the link to reset your password: http://localhost:4200/new-password/" . $token;
        $headers = "From:help@testify.com";

        $data = [
            'token' => $token,
        ];

        Mail::to($email)->send(new \App\Mail\ResetPassword($data));
    }

    private function changePasswordToken($email)
    {
        password_reset_token::where('email', $email)->delete();

        $code = Str::random(16);

        password_reset_token::create([
            'email' => $email,
            'token' => $code,
            'created_at' => now()
        ]);

        $this->tokenSendEmail($code, $email);
    }


    public function newPassword(Request $request, $token)
    {

        $data = password_reset_token::where('token', $token)->first();

        if ($data == null) {
            return response()->json(['message' => 'Invalid token', "status" => 403], 403);
        }

        if ($data->created_at->diffInMinutes(now()) > 10) {
            $this->changePasswordToken($data->email);
            return response()->json(['message' => 'new Password reset token created', "status" => 402], 402);
        }

        $user = User::where('email', $data->email)->first();
        $user->password = bcrypt($request->password);
        $user->save();

        $data->delete();

        return response()->json(['message' => 'Password successfully reset'], 200);
    }


    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60
            // 'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
