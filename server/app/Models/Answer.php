<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class answer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'text',
        'question_id',
        'order',
        'image_path',
        'correctAnswer',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */

    public function getQuestion()
    {
        return $this->belongsTo('App\Models\Question');
    }
}
