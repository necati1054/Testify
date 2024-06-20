<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class question extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'text',
        'test_id',
        'point',
        'type',
        'image_path',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */


    public function getTest()
    {
        return $this->belongsTo('App\Models\Test');
    }

    public function answers()
    {
        return $this->hasMany('App\Models\Answer')->withTrashed();
    }

    public function answersNoTrashed()
    {
        return $this->hasMany('App\Models\Answer');
    }
}
