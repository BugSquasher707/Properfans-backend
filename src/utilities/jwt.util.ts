import fs from 'fs'

import jwt from 'jsonwebtoken'


/**
 * JWT private key
 */
const privateKey = fs.readFileSync('private.key', 'utf8')
const publicKey = fs.readFileSync('public.key', 'utf8')

/**
 * Used to signed the given payload into JWT sting
 *
 * @param object object
 * @param options
 * @returns String
 */
export const decode = (token: string, verifyOptions: jwt.VerifyOptions) => {
    try {
        /**
         * Decode the token to get encoded details
         */
        const decoded = jwt.verify(token.toString(), publicKey, verifyOptions)

        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === 'JWT expired',
            decoded: null
        }
    }
}

/**
 * Used to decode the JWT string
 *
 * @param token string
 * @returns Object
 */
export const sign = (object: Object, options?: jwt.SignOptions | undefined) => {
    return jwt.sign(object, privateKey, options)
}
