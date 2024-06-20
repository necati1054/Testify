<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Solved_question;
use App\Models\Question;

class solved_test extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'test_id',
        'total_point',
        'solved_date',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'deleted_at',
    ];

    public function getUser()
    {
        return $this->belongsTo('App\Models\User', "user_id", "id");
    }

    public function getSolvedQuestions()
    {
        return $this->hasMany('App\Models\Solved_question');
    }
    public function getSolvedQuestionsGroup()
    {
        return $this->belongsToMany('App\Models\Solved_question');
        // return solved_question::selectRaw('question_id, count(*) GROUP_CONCAT("given_answer_id")')
        //     ->groupBy('question_id')->get;
    }

    public function getTest()
    {
        return $this->belongsTo('App\Models\Test', "test_id", "id")->withTrashed();
    }
}
