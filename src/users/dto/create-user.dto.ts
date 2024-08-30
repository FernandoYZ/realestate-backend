import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator";

export enum Gender {
    Masculino = 'Masculino',
    Femenino = 'Femenino',
    Otros = 'Otros',
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @IsString()
    @IsNotEmpty()
    readonly lastname: string;
    
    @IsInt()
    @IsNotEmpty()
    @Length(8,8)
    readonly identity_document: number;
    
    @IsOptional()
    @IsEnum(Gender)
    readonly gender?: Gender;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;
}
