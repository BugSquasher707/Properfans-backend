import { Types } from "mongoose"

interface IBrandSubscription {
    brandId: Types.ObjectId;
    brandTierId: Types.ObjectId;
    userId: Types.ObjectId;
}

export default IBrandSubscription
