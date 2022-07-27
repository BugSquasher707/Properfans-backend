import { Request, Response, NextFunction } from 'express'
import jwt from "jsonwebtoken"
import { get } from "lodash"

import config from '../configurations/config'
import { decode } from "../utilities/jwt.util"

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"]
    const issuer = config.TOKEN_ISSUER
   // const audience = req.headers["origin"]

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ')
        const token = bearer[1]
        let verifyOptions = {
            algorithm: ["RS256"],
        } as jwt.VerifyOptions
        if (typeof issuer !== 'undefined') {
            Object.assign(verifyOptions, { issuer })
        }
        /* if (typeof audience !== 'undefined') {
            Object.assign(verifyOptions, { audience });
        } */
        const { decoded } = decode(token, verifyOptions)

        if (!decoded || !get(decoded, "id")) {
            return res.status(401).json({ status: false, message: 'Un-authorized' })
        } else {

            let userId = get(decoded, "id")
            let roles = get(decoded, "roles")

            let rolesArray: any = []

            if (roles !== undefined && roles.bloomfulx !== undefined) {
                rolesArray = roles.bloomfulx
            }

            req.user = { 'userId': userId, 'roles': rolesArray }
            next()

        }
    } else {
        return res.status(401).json({ status: false, message: 'Un-authorized' })
    }
}

export default verifyToken
