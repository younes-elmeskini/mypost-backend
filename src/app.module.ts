import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './modules/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user.module';
@Module({
  imports: [PostModule, PrismaModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
