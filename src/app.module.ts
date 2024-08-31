import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConnectionNoSql } from './config/database';
import { UsersModule } from './security/users/users.module';
import { RolesModule } from './security/roles/roles.module';
import { PermissionsModule } from './security/permissions/permissions.module';
import { CustomersModule } from './billing/customers/customers.module';
import { SalesModule } from './billing/sales/sales.module';
import { CreditsModule } from './billing/credits/credits.module';
import { QuotesModule } from './billing/quotes/quotes.module';
import { ReservationsModule } from './billing/reservations/reservations.module';
import { PaymentsModule } from './billing/payments/payments.module';
import { LotsModule } from './logistic/lots/lots.module';
import { BlocksModule } from './logistic/blocks/blocks.module';
import { ConceptsModule } from './treasury/concepts/concepts.module';
import { ExpensesModule } from './treasury/expenses/expenses.module';
import { ReceiptsModule } from './treasury/receipts/receipts.module';
import { ProjectsModule } from './setting/projects/projects.module';
import { CurrenciesModule } from './setting/currencies/currencies.module';
import { BranchesModule } from './setting/branches/branches.module';
import { BanksModule } from './setting/banks/banks.module';
import { VouchersModule } from './setting/vouchers/vouchers.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const db = ConnectionNoSql(configService);        
        return { uri: db };
      },
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    PermissionsModule,
    CustomersModule,
    SalesModule,
    CreditsModule,
    QuotesModule,
    ReservationsModule,
    LotsModule,
    BlocksModule,
    ConceptsModule,
    ExpensesModule,
    ReceiptsModule,
    ProjectsModule,
    VouchersModule,
    BanksModule,
    BranchesModule,
    CurrenciesModule,
    ReportsModule,
    PaymentsModule,
  ],
})
export class AppModule {}
