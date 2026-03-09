<?php 


namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;
use App\Models\Client;

class ClientValidationTest extends TestCase
{
    use RefreshDatabase;

    public function test_client_field_is_required()
    {
        $validator = Validator::make([], [
            'client' => 'required|string|max:255',
        ]);

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('client', $validator->errors()->toArray());
    }

    public function test_email_must_be_valid()
    {
        $validator = Validator::make(
            ['email' => 'not-an-email'],
            ['email' => 'required|email']
        );

        $this->assertTrue($validator->fails());
    }

    public function test_code_must_be_unique()
    {
        Client::factory()->create(['code' => 'CLI-2026-0001']);

        $validator = Validator::make(
            ['code' => 'CLI-2026-0001'],
            ['code' => 'unique:clients,code']
        );

        $this->assertTrue($validator->fails());
    }
}
?>