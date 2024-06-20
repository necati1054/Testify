<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Http\Controllers\Controller;
use App\Models\Answer;
use Illuminate\Http\Request;
use App\Models\Test;

class QuestionController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function store(Request $request)
    {
        foreach ($request->all() as $questionDataArray) {
            foreach ($questionDataArray as $index2 => $questionData) {
                if (array_key_exists('id', $questionData)) {
                    $testData = question::find($questionData['id']);
                    $testData->update([
                        'text' => $questionData['text'],
                        'tests_id' => $questionData['test_id'],
                        'point' => $questionData['point'],
                        'type' => $questionData['type'],
                    ]);
                } else {
                    $testData = question::create([
                        'text' => $questionData['text'],
                        'test_id' => $questionData['test_id'],
                        'point' => $questionData['point'],
                        'type' => $questionData['type'],
                    ]);
                }
                foreach ($questionData['answers'] as $index => $answerData) {
                    if (array_key_exists('id', $answerData)) {
                        if ($answerData['deleted_at'] == null) {
                            $answer = answer::find($answerData['id']);
                            $answer->update([
                                'text' => $answerData['text'],
                                'question_id' => $testData->id,
                                'correctAnswer' => $answerData['correctAnswer']
                            ]);
                        } else {
                            continue;
                        }
                    } else {
                        $answer = answer::create([
                            'text' => $answerData['text'],
                            'question_id' => $testData->id,
                            'correctAnswer' => $answerData['correctAnswer']
                        ]);
                    }
                }
            }
        }

        return response()->json(['message' => 'questions and answers have been created successfully'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(question $question)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(question $question)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, question $question)
    {
        foreach ($request->all() as $questionData) {
            $testData = question::find($questionData['id']);
            $testData->update([
                'text' => $questionData['text'],
                'tests_id' => $questionData['test_id'],
                'point' => $questionData['point'],
                'type' => $questionData['type'],
                'order' => $questionData['order']
            ]);

            foreach ($questionData['Answer'] as $answerData) {
                $answer = answer::find($answerData['id']);
                $answer->update([
                    'text' => $answerData['text'],
                    'question_id' => $testData->id,
                    'order' => $answerData['order'],
                    'correctAnswer' => $answerData['correctAnswer']
                ]);
            }
        }

        return response()->json(['message' => 'questions and answers have been successfully updated'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = question::find($id);
        $data->delete();

        $answers = answer::where('question_id', $id)->get();
        foreach ($answers as $answer) {
            $answer->delete();
        }

        return response()->json(['message' => 'questions and answers were successfully deleted'], 200);
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg|max:5120',
        ]);

        $file = $request->file("image");
        $imageName = time() . '_' . $file->getClientOriginalName();
        $file->move(\public_path('Image'), $imageName);

        if ($request->has('question_id')) {
            $question = Question::find($request->question_id);
            $question->image_path = $imageName;
            $question->save();
        } else {
            $answer = Answer::find($request->answer_id);
            $answer->image_path = $imageName;
            $answer->save();
        }

        return response()->json(['message' => 'Image uploaded successfully'], 200);
    }


    public function deleteImage(Request $request)
    {
        if ($request->has('question_id')) {
            $question = Question::find($request->question_id);
            $question->image_path = null;
            $question->save();
        } else {
            $answer = Answer::find($request->answer_id);
            $answer->image_path = null;
            $answer->save();
        }

        return response()->json(['message' => 'Image deleted successfully'], 200);
    }
}
