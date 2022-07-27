import { Types } from "mongoose"

/**
 * BrandTier interface
 */
export interface BrandTierDocument {
    tierName: string;
    tierLevel: number;
    price: number;
    brandId: Types.ObjectId
}
