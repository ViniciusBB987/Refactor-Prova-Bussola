import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    this.logger.log(`Request ${method} ${url}`);
    next();
  }

}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    
    const token = req.headers['authorization'];

    this.logger.log('a')

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { method, url } = req;
    this.logger.log(`Request ${method} ${url}`);
    next();
  }
  
}

export class CourseMiddleware implements NestMiddleware {

  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    
    let curso = req.body

    curso = curso.valor * 0.5

    req.body.curso = curso

    next();
  }

  
}