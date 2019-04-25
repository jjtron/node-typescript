import { Request, Response, NextFunction } from 'express';
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core';
import middleware1 from './routes';

@Controller('api/users')
export class UserController {
    
    @Get(':id')
    get(req: Request, res: Response): any {
        return res.status(200).json({msg: req.params.id});
    }

    @Get()
    @Middleware(middleware1)
    private getAll(req: Request, res: Response): void {
        res.status(200).json({msg: 'get_all_called'});
    }
}