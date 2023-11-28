import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, PrismaModule, UsersModule, JwtModule } from './modules';
import { AccessTokenGuard } from './modules/auth/common/guards';
import { GoogleStrategy } from './modules/auth/strategies';
import { MailerModule } from '@nestjs-modules/mailer';
import { APP_GUARD } from '@nestjs/core';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILER_HOST,
        port: 587,
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASSWORD,
        },
      },
    }),
    AuthModule,
    PrismaModule,
    UsersModule,
    JwtModule,
    SupabaseModule,
    UploadModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    GoogleStrategy,
  ],
})
export class AppModule {}
