<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SuccessResource;
use App\Models\Client;
use Illuminate\Http\Request;
use  App\Http\Resources\ClientResource;



class ClientController extends Controller
{
   public function store(Request $request)
{
    $validatedData = $request->validate([
        'client'       => 'required|string|max:255',
        'email'        => 'required|email|unique:clients',
        'sigle'        => 'required|string',
        'ncc'          => 'nullable|string|unique:clients',
        'rccm'         => 'nullable|string|unique:clients',
        'tva'          => 'nullable|numeric',
        'delai'        => 'nullable|numeric',
        'adresse'      => 'nullable|string',
        'localisation' => 'nullable|string',
        'numero'       => 'nullable|numeric',
    ]);

    $annee = date('Y');
    $dernierClient = Client::whereYear('created_at', $annee)->latest('id')->first();

    if ($dernierClient) {
        $numero = (int) explode('-', $dernierClient->code)[2] + 1;
    } else {
        $numero = 1;
    }

    $code = 'CLI-' . $annee . '-' . str_pad($numero, 4, '0', STR_PAD_LEFT);

    while (Client::where('code', $code)->exists()) {
        $numero++;
        $code = 'CLI-' . $annee . '-' . str_pad($numero, 4, '0', STR_PAD_LEFT);
    }

    $validatedData['tva']  = $request->filled('tva') ? $request->input('tva') : 18;
    $validatedData['code'] = $code;

    $client = Client::create($validatedData);

    // return new SuccessResource($client);
    return (new SuccessResource($client))->response()->setStatusCode(201);
}
    public function show(string $id)
{
    $client = Client::findOrFail($id);

    return new SuccessResource([
        'message' => 'Client récupéré avec succès.',
        'data' => new ClientResource($client),
    ]);
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id){
    $client = Client::findOrFail($id);

    $validatedData = $request->validate([
        'client'       => 'sometimes|required|string|max:255',
        'email'        => 'sometimes|required|email|unique:clients,email,' . $id,
        'sigle'        => 'sometimes|required|string',
        'ncc'          => 'nullable|string|unique:clients,ncc,' . $id,
        'rccm'         => 'nullable|string|unique:clients,rccm,' . $id,
        'tva'          => 'nullable|numeric',
        'delai'        => 'nullable|numeric',
        'adresse'      => 'nullable|string',
        'localisation' => 'nullable|string',
        'numero'       => 'nullable|numeric',
    ]);

    $validatedData['tva'] = $request->filled('tva') ? $request->input('tva') : 18;

    $client->update($validatedData);

    return new SuccessResource($client);
}

    /**
     * Remove the specified resource from storage.
     */
     public function destroy(string $id)
    {
        $client = Client::find($id);

        if ($client) {
            $client->delete();
            return response()->json(['message' => 'Client deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'Client not found'], 404);
        }
    }

    public function client(Request $request)
    {
        $clients = client::all();
        return new SuccessResource([
            'message' => 'Les clients Récupérer avec succès.',
            'data' => ClientResource::collection($clients),
        ]);
    }
}
