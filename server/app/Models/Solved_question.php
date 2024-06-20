<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class solved_question extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'solved_test_id',
        'question_id',
        'given_answer_id',
        'given_answer_text',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */



    public function getSolvedTest()
    {
        return $this->belongsTo('App\Models\Solved_test');
    }

    public function getQuestion()
    {
        return $this->belongsTo('App\Models\Question', "question_id", "id")->withTrashed();;
    }
}
