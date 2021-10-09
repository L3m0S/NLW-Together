import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authToken = request.headers.authorization

    if(!authToken){
        return response.status(401).end();
    }

    const [ ,token] = authToken.split(" ")


    try {
        const decode = verify(token, "15a33f1fd2d13dfe92b032adc4f25e7b");

        return next();
    } catch (err) {
        return response.status(401).end()
    }
    

}