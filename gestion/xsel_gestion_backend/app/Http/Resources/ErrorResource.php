<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ErrorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'status' => 'error',
            'message' =>  $this->resource['message'],
            'errors' => $this->resource['errors'] ?? null,
        ];
    }

    public function withResponse($request, $response)
    {
        $response->setStatusCode($this['status_code'] ?? 400);
    }
}