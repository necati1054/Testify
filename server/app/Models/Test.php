<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class test extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'testName',
        'user_id',
        'totalPoint',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */

    public function getCreater()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }

    public function getQuestions()
    {
        return $this->hasMany('App\Models\Question');
    }

    public function getsolvedtestcount()
    {
        return $this->hasMany('App\Models\Solved_test');
    }
}
