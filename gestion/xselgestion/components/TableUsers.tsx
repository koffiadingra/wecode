"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MoreHorizontalIcon,
  FilterIcon,
  Trash2Icon,
  SearchIcon,
} from "lucide-react";


type Client = {
  code: string;
  nom: string;
  sigle: string;
  email: string;
  numero: string;
  regime: string;
  adresse: string;
};


const tousLesClients: Client[] = [
  {
    code: "CL-2026-0001",
    nom: "Example Corp",
    sigle: "EX",
    email: "example@example.com",
    numero: "+225 0000000000",
    regime: "PME",
    adresse: "Cocody Palmeraie",
  },
  {
    code: "CL-2026-0002",
    nom: "Mechanical Keyboard",
    sigle: "MK",
    email: "mk@example.com",
    numero: "+225 0101010101",
    regime: "GE",
    adresse: "Plateau Centre",
  },
  {
    code: "CL-2026-0003",
    nom: "USB-C Hub",
    sigle: "UH",
    email: "uh@example.com",
    numero: "+225 0202020202",
    regime: "PME",
    adresse: "Yopougon",
  },
  {
    code: "CL-2026-0004",
    nom: "Alpha Tech",
    sigle: "AT",
    email: "alpha@tech.com",
    numero: "+225 0303030303",
    regime: "TPE",
    adresse: "Cocody Palmeraie",
  },
  {
    code: "CL-2026-0005",
    nom: "Beta Solutions",
    sigle: "BS",
    email: "beta@solutions.com",
    numero: "+225 0404040404",
    regime: "GE",
    adresse: "Yopougon",
  },
];

const regimesDisponibles = [...new Set(tousLesClients.map((c) => c.regime))];
const adressesDisponibles = [...new Set(tousLesClients.map((c) => c.adresse))];


export function TableActions() {
  const [rechercheNom, setRechercheNom] = React.useState("");
  const [rechercheEmail, setRechercheEmail] = React.useState("");
  const [rechercheSigle, setRechercheSigle] = React.useState("");

  const [filtresRegime, setFiltresRegime] = React.useState<
    Record<string, boolean>
  >({});
  const [filtresAdresse, setFiltresAdresse] = React.useState<
    Record<string, boolean>
  >({});

  const [selectionnes, setSelectionnes] = React.useState<Set<string>>(
    new Set(),
  );

  const [clients, setClients] = React.useState<Client[]>(tousLesClients);

  

  const toggleFiltre = (
    categorie: "regime" | "adresse",
    valeur: string,
    coche: boolean,
  ) => {
    if (categorie === "regime") {
      setFiltresRegime((prev) => ({ ...prev, [valeur]: coche }));
    } else {
      setFiltresAdresse((prev) => ({ ...prev, [valeur]: coche }));
    }
  };

  const toggleSelection = (code: string) => {
    setSelectionnes((prev) => {
      const nouveauSet = new Set(prev);
      if (nouveauSet.has(code)) {
        nouveauSet.delete(code);
      } else {
        nouveauSet.add(code);
      }
      return nouveauSet;
    });
  };

  const toggleTout = () => {
    if (selectionnes.size === clientsFiltres.length) {
      setSelectionnes(new Set());
    } else {
      setSelectionnes(new Set(clientsFiltres.map((c) => c.code)));
    }
  };

  const supprimerSelection = () => {
    setClients((prev) => prev.filter((c) => !selectionnes.has(c.code)));
    setSelectionnes(new Set());
  };

  
  const clientsFiltres = clients.filter((client) => {
    const nomOk = client.nom.toLowerCase().includes(rechercheNom.toLowerCase());

    const emailOk = client.email
      .toLowerCase()
      .includes(rechercheEmail.toLowerCase());

    const sigleOk = client.sigle
      .toLowerCase()
      .includes(rechercheSigle.toLowerCase());

    const regimesCocheches = Object.keys(filtresRegime).filter(
      (k) => filtresRegime[k],
    );
    const regimeOk =
      regimesCocheches.length === 0 || regimesCocheches.includes(client.regime);

    const adressesCochees = Object.keys(filtresAdresse).filter(
      (k) => filtresAdresse[k],
    );
    const adresseOk =
      adressesCochees.length === 0 || adressesCochees.includes(client.adresse);

    return nomOk && emailOk && sigleOk && regimeOk && adresseOk; 
  });

  const tousSelectionnes =
    clientsFiltres.length > 0 && selectionnes.size === clientsFiltres.length;


  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom..."
            value={rechercheNom}
            onChange={(e) => setRechercheNom(e.target.value)}
            className="pl-8 w-52"
          />
        </div>

        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par email..."
            value={rechercheEmail}
            onChange={(e) => setRechercheEmail(e.target.value)}
            className="pl-8 w-52"
          />
        </div>

        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par sigle..."
            value={rechercheSigle}
            onChange={(e) => setRechercheSigle(e.target.value)}
            className="pl-8 w-52"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <FilterIcon className="size-4" />
              Filtres
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Régime d`imposition</DropdownMenuLabel>
              {regimesDisponibles.map((regime) => (
                <DropdownMenuCheckboxItem
                  key={regime}
                  checked={filtresRegime[regime] ?? false}
                  onCheckedChange={(coche) =>
                    toggleFiltre("regime", regime, coche)
                  }
                >
                  {regime}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Adresse</DropdownMenuLabel>
              {adressesDisponibles.map((adresse) => (
                <DropdownMenuCheckboxItem
                  key={adresse}
                  checked={filtresAdresse[adresse] ?? false}
                  onCheckedChange={(coche) =>
                    toggleFiltre("adresse", adresse, coche)
                  }
                >
                  {adresse}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {selectionnes.size >= 2 && (
          <Button
            variant="destructive"
            className="gap-2 ml-auto"
            onClick={supprimerSelection}
          >
            <Trash2Icon className="size-4" />
            Supprimer ({selectionnes.size})
          </Button>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                checked={tousSelectionnes}
                onCheckedChange={toggleTout}
                aria-label="Tout sélectionner"
              />
            </TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Sigle</TableHead>
            <TableHead>Adresse mail</TableHead>
            <TableHead>Numéro</TableHead>
            <TableHead>Régime d`imposition</TableHead>
            <TableHead>Adresse</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {clientsFiltres.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={9}
                className="text-center text-muted-foreground py-8"
              >
                Aucun client trouvé
              </TableCell>
            </TableRow>
          ) : (
            clientsFiltres.map((client) => (
              <TableRow
                key={client.code}
                data-state={
                  selectionnes.has(client.code) ? "selected" : undefined
                }
              >
                <TableCell>
                  <Checkbox
                    checked={selectionnes.has(client.code)}
                    onCheckedChange={() => toggleSelection(client.code)}
                    aria-label={`Sélectionner ${client.nom}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{client.code}</TableCell>
                <TableCell>{client.nom}</TableCell>
                <TableCell>{client.sigle}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.numero}</TableCell>
                <TableCell>{client.regime}</TableCell>
                <TableCell>{client.adresse}</TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontalIcon />
                        <span className="sr-only">Ouvrir le menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Voir</DropdownMenuItem>
                      <DropdownMenuItem>Modifier</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => {
                          setClients((prev) =>
                            prev.filter((c) => c.code !== client.code),
                          );
                          setSelectionnes((prev) => {
                            const s = new Set(prev);
                            s.delete(client.code);
                            return s;
                          });
                        }}
                      >
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
