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
        Schema::create('posts', function(Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('image')->nullable();
            $table->integer('like')->default(0);
            $table->foreignId('users_id')->constrained()->onDelete('cascade');
            // $table->foreignId('user_id')->nullable()->index();
            $table->timestamps();
        });
        Schema::create('posts_like', function(Blueprint $table) {
            $table->id();
            $table->foreignId('posts_id')->constrained()->onDelete('cascade');
            $table->foreignId('users_id')->constrained()->onDelete('cascade');
            $table->unique(['users_id', 'posts_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
        Schema::dropIfExist('posts_like');
    }
};
