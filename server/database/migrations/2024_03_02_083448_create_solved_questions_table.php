<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('solved_questions', function (Blueprint $table) {
            $table->id();
            $table->integer('solved_test_id');
            $table->integer('question_id');
            $table->string('given_answer_id', length: 100)->nullable();
            $table->string('given_answer_text', length: 100)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solved_questions');
    }
};
