import { PartialType } from "@nestjs/swagger";
import { CreatePropertyDto } from "./create-prop.dto";

export class UpdatePropertyDto extends PartialType(CreatePropertyDto){}