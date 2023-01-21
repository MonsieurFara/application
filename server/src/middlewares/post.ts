import {Request, Response, NextFunction} from 'express'
import db from '../config/db';
import {MysqlError} from 'mysql'

export const postById = (req: Request, res: Response, next: NextFunction, id: number) => {
    try {
        let query = `SELECT * FROM posts WHERE id=${id}`;

        db.query(query, (err: MysqlError, result: string | any[]) => {
            if(err) throw err;

            if(result.length === 0){
                return res.status(404).json({error: "Post not found"});
            }

            req.post = result[0];

            next();
        })
    } catch (err:any) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}