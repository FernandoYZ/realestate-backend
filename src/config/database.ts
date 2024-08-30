import { ConfigService } from "@nestjs/config";

export const ConnectionNoSql = (configService: ConfigService): string => {
    const connection = configService.get<string>('DB_CONNECTION');
    const host = configService.get<string>('DB_HOST');
    const port = configService.get<string>('DB_PORT');
    const database = configService.get<string>('DB_DATABASE');

    return `${connection}://${host}:${port}/${database}`;
}
