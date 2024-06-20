<?php

namespace App\Http\Controllers;

use App\Models\Solved_test;
use App\Http\Controllers\Controller;
use App\Models\Answer;
use App\Models\Question;
use App\Models\Solved_question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class SolvedTestController extends Controller
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
    public function index()
    {
        // $search = "Soru = 'Üzerinde yazılı olan değer' olarak tanımlanan hisse senedi değerine ne ad verilir? öğrencinin_cevabı = null ";
        $search = "soru = 'üzerinde yazılı olan değer' olarak tanımlanan hisse senedi değerine ne ad verilir? öğrencinin_cevabı =";
        $response = Http::withHeaders([
            'content-type' => 'application/json',
            'Authorization' => 'Bearer ' . env('openAiApiKey'),
        ])
            ->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-4o',
                "messages" => [
                    [
                        "role" => "system",
                        "content" => "Verify the correctness of a student's answer given to a teacher-generated question. If the student's response is blank, respond as 'incorrect.' Confirm whether the student's answer is 'correct' or 'incorrect' based on the teacher's perspective. If you're unsure about the topic or the answer, respond as 'undecided' and refrain from providing any additional comments or information."
                    ],
                    [
                        "role" => "user",
                        "content" => $search
                    ]
                ],
                'temperature' => 0,
                'max_tokens' => 1024,
                // 'top_p' => 1,
                // 'frequency_penalty' => 0.52,
                // 'presence_penalty' => 0.5,
                // 'stop' => ["11."],
            ])->body();
        $responseData = json_decode($response, true);
        return response()->json($responseData);
    }

    private function aiControl($teacher_question, $student_answer)
    {
        $search = "Soru = " . $teacher_question . " öğrencinin_cevabı = " . $student_answer;
        $response = Http::withHeaders([
            'content-type' => 'application/json',
            'Authorization' => 'Bearer ' . env('openAiApiKey'),
        ])
            ->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-4o',
                "messages" => [
                    [
                        "role" => "system",
                        "content" => "Verify the correctness of a student's answer given to a teacher-generated question. If the student's response is blank, respond as 'incorrect.' Confirm whether the student's answer is 'correct' or 'incorrect' based on the teacher's perspective. If you're unsure about the topic or the answer, respond as 'undecided' and refrain from providing any additional comments or information."
                    ],
                    [
                        "role" => "user",
                        "content" => $search
                    ]
                ],
                'temperature' => 0,
                'max_tokens' => 1024,
            ])->json();

        return $response['choices'][0]['message']['content'];
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = solved_test::create([
            'user_id' => $request->user_id,
            'test_id' => $request->test_id,
            'total_point' => 0,
            'solved_date' => now(),
        ]);

        $TotalPoint = 0;
        $InsertData = [];

        foreach ($request->question as $SolvedData) {
            $questionData = Question::where('id', $SolvedData['questionId'])
                ->with(['answers' => function ($query) {
                    $query->where('correctAnswer', 1);
                }])
                ->first();
            if ($questionData->type == 1) {
                if ($questionData->answers[0]->id == $SolvedData['answerId']) {
                    $TotalPoint += $questionData->point;
                }
                $InsertData[] = [
                    'solved_test_id' => $data->id,
                    'question_id' => $SolvedData['questionId'],
                    'given_answer_id' => $SolvedData['answerId'],
                    'given_answer_text' => null,
                    'created_at' => now(),
                ];
            } else if ($questionData->type == 3) {
                $correctAnswer = [];
                $answersData = "";
                foreach ($questionData->answers as $answer) {
                    array_push($correctAnswer, $answer->id);
                }
                if (count($correctAnswer) == count($SolvedData['answerId'])) {
                    $check = 0;
                    foreach ($SolvedData['answerId'] as  $answer) {
                        if (in_array($answer, $correctAnswer)) {
                            $check++;
                        }
                        $answersData .= $answer . ",";
                    }
                    if ($check == count($correctAnswer)) {
                        $TotalPoint += $questionData->point;
                    }

                    $InsertData[] = [
                        'solved_test_id' => $data->id,
                        'question_id' => $SolvedData['questionId'],
                        'given_answer_text' => null,
                        // 'given_answer_id' => implode(',', explode(',', Str::substr($answersData, 0, -1))),
                        'given_answer_id' => rtrim($answersData, ","),
                        'created_at' => now(),
                    ];
                } else {
                    foreach ($SolvedData['answerId'] as  $answer) {
                        $answersData .= $answer . ",";
                    }
                    $InsertData[] = [
                        'solved_test_id' => $data->id,
                        'question_id' => $SolvedData['questionId'],
                        'given_answer_text' => null,
                        // 'given_answer_id' => implode(',', explode(',', Str::substr($answersData, 0, -1))),
                        'given_answer_id' => rtrim($answersData, ","),
                        'created_at' => now(),
                    ];
                }
            } else if ($questionData->type == 2) {
                //doğruluk sistemine bakılacak
                $response = $this->aiControl($questionData->text, $SolvedData['answer_text']);
                $response = mb_strtolower($response, "UTF-8");
                if (in_array($response, ['correct', 'undecided', 'doğru', 'true'])) {
                    $TotalPoint += $questionData->point;
                }
                $InsertData[] = [
                    'solved_test_id' => $data->id,
                    'question_id' => $SolvedData['questionId'],
                    'given_answer_id' => null,
                    'given_answer_text' => $SolvedData['answer_text'],
                    'created_at' => now(),
                ];
            }
        }
        solved_question::insert($InsertData);
        $data->update(['total_point' => $TotalPoint]);

        return response()->json(['message' => 'solved test has been created successfully', 'point' => $TotalPoint]);
    }

    public function getSolvedTest($id)
    {
        $solvedTest = solved_test::where('user_id', $id)->get()->load("getTest");
        return response()->json(['solvedTest' => $solvedTest], 200);
    }

    public function lookOver($id)
    {
        $data = solved_test::where('id', $id)->get()->load("getTest", "getSolvedQuestions", "getSolvedQuestions.getQuestion", "getSolvedQuestions.getQuestion.answers");

        //grup çalışıyor ama diğer işaretli şıklar yok
        // $data = solved_test::with(['getSolvedQuestions' => function ($query) {
        //     $query->with(['getQuestion' => function ($q) {
        //         $q->with('answers');
        //     }])->groupBy('question_id');
        // }])
        //     ->findOrFail($id);

        return response()->json($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(solved_test $solved_test)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(solved_test $solved_test)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, solved_test $solved_test)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(solved_test $solved_test)
    {
        //
    }
}
