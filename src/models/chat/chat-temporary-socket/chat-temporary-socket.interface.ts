import { Types } from "mongoose"

export interface ChatTemporarySocketDocument {
    userId: Types.ObjectId;
    socketId: string;
}
