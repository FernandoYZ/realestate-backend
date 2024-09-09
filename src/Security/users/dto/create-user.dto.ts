import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MinLength } from "class-validator";
import { Schema as MongooseSchema } from "mongoose";
import { Gender } from "src/enums/gender.enum";
import { Status } from "src/enums/status.enum";

export class CreateUserDto {
    @IsString({ message: 'Por favor, ingrese un nombre válido (solo letras).' })
    @IsNotEmpty({ message: 'El nombre es obligatorio. ¡Por favor, complete este campo!' })
    readonly name: string;
    
    @IsString({ message: 'Por favor, ingrese un apellido válido (solo letras).' })
    @IsNotEmpty({ message: 'El apellido es obligatorio. ¡Por favor, complete este campo!' })
    readonly lastname: string;
    
    @IsString({ message: 'El documento de identidad debe ser un número entero.' })
    @IsNotEmpty({ message: 'El documento de identidad es necesario. ¡Por favor, complete este campo!' })
    @Length(8, 8, { message: 'El documento de identidad debe tener exactamente 8 dígitos.' })
    readonly identity_document: number;

    @IsArray()
    @ArrayNotEmpty({ message: 'El acceso debe contener al menos un elemento.' })
    @IsNotEmpty({ each: true, message: 'Cada elemento de acceso debe ser un ObjectId válido.' })
    readonly access: MongooseSchema.Types.ObjectId[];
    
    @IsOptional()
    @IsEnum(Gender, { message: 'Por favor, seleccione un género válido.' })
    readonly gender?: Gender;

    @IsNotEmpty({ message: 'El correo electrónico es necesario. ¡Por favor, complete este campo!' })
    @IsEmail({}, { message: 'Por favor, ingrese un correo electrónico válido.' })
    readonly email: string;

    @IsNotEmpty({ message: 'La contraseña es obligatoria. ¡Por favor, complete este campo!' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    readonly password: string;

    @IsEnum(Status, { message: 'Por favor, seleccione un estado válido.' })
    @IsOptional()
    readonly status?: Status;
}