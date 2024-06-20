<?php

namespace App\Http\Controllers;

use App\Models\Test;
use App\Http\Controllers\Controller;
use App\Http\Resources\TestResource;
use App\Models\Solved_test;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TestController extends Controller
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

    /**
     * Display a listing of the resource.
     */
    public function index() //student
    {
        return test::all();
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) //teacher
    {
        $test = test::create($request->all());

        return response()->json(['message' => 'Test created successfully', 'test' => $test], 201);
    }

    public function getMyTests($id) //teacher
    {
        $tests = test::where('user_id', $id)->get();

        return response()->json(['tests' => $tests], 200);
    }


    public function getTestData($id) //teacher
    {
        $test = test::find($id);
        return response()->json($test, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request) //teacher
    {
        $test = test::find($request->id);
        $test->update($request->all());

        return response()->json(['message' => 'Test updated successfully', 'test' => $test], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) //teacher
    {
        $test = test::find($id)->delete();

        return response()->json(['message' => 'Test deleted successfully'], 200);
    }

    public function bringTheTest($id)
    {
        if (Auth::user()->role == 3) {
            $test = Test::where('id', $id)
                ->with(['getQuestions' => function ($query) {
                    $query->inRandomOrder()->with('answers');
                }])
                ->first();
        } else {
            $test = test::where('id', $id)->get()->load('getQuestions', 'getQuestions.answers');
        }

        return response()->json($test, 200);
    }

    public function testSolvers($id)
    {
        $testUser = solved_test::where('test_id', $id)->get()->load('getUser');
        // $test = solved_test::where('test_id', $id)->get()->load('getUser', 'getTest');
        $test = test::find($id);
        return response()->json(['data' => $testUser, 'test' => $test], 200);
    }

    public function testSolver($id)
    {
        // $data = solved_test::where('user_id', $kid)->where('test_id', $id)->get()->load("getUser", "getTest", "getSolvedQuestions", "getSolvedQuestions.getQuestion", "getSolvedQuestions.getQuestion.getAnswers");
        // return response()->json($data);


        $data = solved_test::where('id', $id)->get()->load("getUser", "getTest", "getSolvedQuestions", "getSolvedQuestions.getQuestion", "getSolvedQuestions.getQuestion.answers");
        return response()->json($data);
    }
}
