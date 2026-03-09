<?php

namespace App\Enums;

enum Role: string
{
    case USER  = 'user';
    case ADMIN = 'admin';

    public function label(): string
    {
        return match($this) {
            Role::USER  => 'Utilisateur',
            Role::ADMIN => 'Administrateur',
        };
    }

    public function isAdmin(): bool
    {
        return $this === Role::ADMIN;
    }
}