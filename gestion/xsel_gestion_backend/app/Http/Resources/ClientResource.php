<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'client' => $this->client,
            'sigle' => $this->sigle,
            'ncc' => $this->NCC,
            'rccm' => $this->ncc,
            'tva' => $this->tva,
            'delai' => $this->delai,
            'adresse' => $this->adresse,
            'localisation' =>$this->localisation,
            'numero' => $this->numero,
            'email' => $this->email,
            'created_at' => $this->created_at->toISOString(),
        ];
    }
}
