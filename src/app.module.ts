import { Module, Scope } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Cat } from './entities/cat.entity';
@Module({
  imports: [
    MikroOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 33071,
      dbName: 'nestjs_mikro_orm_test',
      user: 'nestjs_mikro_orm_test',
      password: 'secret',
      debug: false,
      baseDir: process.cwd(),
      entitiesTs: [],
      autoLoadEntities: true,
      entities: [],
      metadataProvider: TsMorphMetadataProvider,
      highlighter: new SqlHighlighter(),
      registerRequestContext: true,
      scope: Scope.REQUEST,
      validateRequired: true,
      validate: true,
      strict: true,
      forceEntityConstructor: true,
      allowGlobalContext: false,
    }),
    MikroOrmModule.forFeature([Cat]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
