import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDTO {
  @IsEmail()
  @IsOptional()
  public email: string;
  @IsString()
  @IsOptional()
  public password: string;
}
