import { PartialType } from "@nestjs/mapped-types";
import { CreatePropertyDto } from "./create-prop.dto";

export class UpdatePropertyDto extends PartialType(CreatePropertyDto){}