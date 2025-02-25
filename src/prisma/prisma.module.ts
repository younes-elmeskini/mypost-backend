import { Global, INestApplication, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {
    async enableShutdownHooks(app: INestApplication) {
        app.enableShutdownHooks();
    }
}