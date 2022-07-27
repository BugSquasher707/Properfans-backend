import { Types } from 'mongoose'

/**
 * Transaction interface
 */

export interface TransactionDocument {
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
    type: string;
    amount: number;
}
