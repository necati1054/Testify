<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'uid' => $this->uid, // uid değerini ekliyoruz
            // 'questions' => QuestionResource::collection($this->whenLoaded('getQuestions')) // İlişkili soruları döndürüyoruz
        ];
    }
}
