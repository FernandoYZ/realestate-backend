import { IsString, IsDate, IsOptional, IsArray } from 'class-validator';

export class CreateTokenDto {
    @IsString()
    readonly user: string;

    @IsString()
    readonly token: string;
    
    @IsDate()
    @IsOptional()
    readonly expiresAt?: Date;
}
