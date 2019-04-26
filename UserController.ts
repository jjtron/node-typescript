import { Request, Response, NextFunction } from 'express';
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core';
import * as a from './middleware';

@Controller('/')
export class UserController {
    
    @Get(':id')
    get(req: Request, res: Response): any {
        return res.status(200).json({msg: req.params.id});
    }

    @Get()
    @Middleware([a.middleware1, a.middleware2])
    private getAll(req: Request, res: Response): void {
        res.status(200).json({msg: 'get_all_called'});
    }
}