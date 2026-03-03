import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontalIcon } from "lucide-react";

export function TableActions() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Sigle</TableHead>
          <TableHead>Adresse mail</TableHead>
          <TableHead>Numéro</TableHead>
          <TableHead>Régime d`Imposition</TableHead>
          <TableHead>Adresse</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">CL-2026-0001</TableCell>
          <TableCell>Example</TableCell>          
          <TableCell>EX</TableCell>
          <TableCell>example@example.com</TableCell>
          <TableCell>+225 0000000000</TableCell>
          <TableCell>PME</TableCell>
          <TableCell>cocody palmeraie</TableCell>
          
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontalIcon />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">CL-2026-0002</TableCell>
          <TableCell>Mechanical Keyboard</TableCell>
          <TableCell>EX</TableCell>
          <TableCell>example@example.com</TableCell>
          <TableCell>+225 0000000000</TableCell>
          <TableCell>PME</TableCell>
          <TableCell>cocody palmeraie</TableCell>
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontalIcon />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">CL-2026-0003</TableCell>
          <TableCell>USB-C Hub</TableCell>
          <TableCell>EX</TableCell>
          <TableCell>example@example.com</TableCell>
          <TableCell>+225 0000000000</TableCell>
          <TableCell>PME</TableCell>
          <TableCell>cocody palmeraie</TableCell>
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontalIcon />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
