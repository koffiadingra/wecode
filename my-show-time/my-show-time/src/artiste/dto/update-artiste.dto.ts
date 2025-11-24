import { PartialType } from '@nestjs/mapped-types';
import { CreateArtisteDto } from './create-artiste.dto';

export class UpdateArtisteDto extends PartialType(CreateArtisteDto) {}
