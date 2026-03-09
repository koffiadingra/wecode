<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Client;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ClientApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_client_successfully()
    {
        $response = $this->postJson('/api/client/create', [
            'client' => 'John Doe',
            'email'  => 'john@mail.com',
            'sigle'  => 'JD',
            'tva'    => 18,
        ]);

        $response->assertStatus(201)
                 ->assertJsonPath('data.client', 'John Doe'); // ✅ adapté

        $this->assertDatabaseHas('clients', ['email' => 'john@mail.com']);
    }

    public function test_fails_if_required_fields_missing()
    {
        $response = $this->postJson('/api/client/create', []);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['client', 'email', 'sigle']);
    }

    public function test_fails_if_email_already_exists()
    {
        Client::factory()->create(['email' => 'john@mail.com']);

        $response = $this->postJson('/api/client/create', [
            'client' => 'Jane Doe',
            'email'  => 'john@mail.com',
            'sigle'  => 'JD',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email']);
    }

    public function test_code_is_auto_generated()
    {
        $response = $this->postJson('/api/client/create', [
            'client' => 'John Doe',
            'email'  => 'john@mail.com',
            'sigle'  => 'JD',
        ]);

        $annee = date('Y');
        $response->assertJsonPath('data.code', 'CLI-' . $annee . '-0001'); 
    }
}
?>