import { Types } from "mongoose"

interface IProperWallet {
    coins: number;
    properfansId: Types.ObjectId;
}

export default IProperWallet
