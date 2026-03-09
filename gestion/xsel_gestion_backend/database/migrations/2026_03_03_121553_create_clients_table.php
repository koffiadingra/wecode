<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('client');
            $table->string('email')->unique();
            $table->string('sigle');
            $table->string('ncc')->nullable()->unique();
            $table->string('rccm')->nullable()->unique();
            $table->decimal('tva', 5, 2)->default(18);
            $table->integer('delai')->nullable();
            $table->string('adresse')->nullable();
            $table->string('localisation')->nullable();
            $table->string('numero')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};