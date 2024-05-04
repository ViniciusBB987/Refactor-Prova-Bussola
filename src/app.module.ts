import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import {CourseMiddleware, LoggerMiddleware } from './logger/middleware';
import { CursoModule } from './curso/curso.module';




@Module({
  imports: [MongooseModule.forRoot('mongodb://0.0.0.0:27017/nest'), AuthModule, UserModule, CursoModule],
  controllers: [],
  providers: [],
})
export class AppModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.ALL })
      .apply(CourseMiddleware)
      .forRoutes({path: 'curso', method: RequestMethod.POST});

  }

}
