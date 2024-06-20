<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SettingController extends Controller
{

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index']]);
    }

    public function index()
    {
        return Setting::all();
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = [];

        if ($request->hasFile('logo')) {
            $file = $request->file("logo");
            $originalExtension = $file->getClientOriginalExtension();
            if ($originalExtension != "jpg") {
                return response()->json([
                    'message' => 'Resim Uzantısı Sadece JPG olabiir',
                    'status' => 403
                ], 403);
            }
        }

        foreach ($request->all() as $key => $value) {
            $query = Setting::Where('key', $key)->first();
            if ($query) {
                if ($key == 'logo') {
                    if ($request->hasFile('logo')) {
                        $file = $request->file("logo");
                        $originalExtension = $file->getClientOriginalExtension();
                        $imageName =  "logo.$originalExtension";
                        $file->move(\public_path('Image'), $imageName);
                        $query->key = $key;
                        $query->value = $imageName;
                        $query->save();
                    }
                } else {
                    $query->key = $key;
                    $query->value = $value;
                    $query->save();
                }
            } else {
                if ($key == 'logo') {
                    if ($request->hasFile('logo')) {
                        $file = $request->file("logo");
                        $originalExtension = $file->getClientOriginalExtension();
                        $imageName =  "logo.$originalExtension";
                        $file->move(\public_path('Image'), $imageName);
                        $newQuery = new Setting();
                        $newQuery->key = $key;
                        $newQuery->value = $imageName;
                        $newQuery->save();
                    }
                } else {
                    $newQuery = new Setting();
                    $newQuery->key = $key;
                    $newQuery->value = $value;
                    $newQuery->save();
                }
            }
        }
        return response()->json(['message' => 'Settings created successfully'], 200);
    }
}
