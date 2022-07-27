import { Types } from "mongoose"

interface IProperWallet {
    coins: number;
    properfansId: Types.ObjectId;
    message: string
}

export default IProperWallet
