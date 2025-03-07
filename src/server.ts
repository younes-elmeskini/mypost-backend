import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const PORT = 3000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    
    await app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

bootstrap();