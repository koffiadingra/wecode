<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
   public function definition(): array
    {
        return [
            'code'   => 'CLI-' . date('Y') . '-' . str_pad(rand(1, 999), 4, '0', STR_PAD_LEFT),
            'client' => $this->faker->company(),
            'email'  => $this->faker->unique()->safeEmail(),
            'sigle'  => strtoupper($this->faker->lexify('??')),
            'tva'    => 18,
        ];
    }
}
