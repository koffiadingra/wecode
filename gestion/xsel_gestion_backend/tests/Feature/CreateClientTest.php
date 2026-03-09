<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CreateClientTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_fill_and_submit_client_form()
    {
        $response = $this->postJson('/api/client/create', [
            'client' => 'John Doe',
            'email'  => 'john@mail.com',
            'sigle'  => 'JD',
            'tva'    => 18,
        ]);

        $response->assertStatus(201)
                 ->assertJsonPath('data.client', 'John Doe'); 

        $this->assertDatabaseHas('clients', [
            'email' => 'john@mail.com'
        ]);
    }

    public function test_shows_validation_errors_on_empty_submit()
    {
        $response = $this->postJson('/api/client/create', []);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['client', 'email', 'sigle']);
    }
}
?>