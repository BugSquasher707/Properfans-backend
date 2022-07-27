import ProperMeetProfile from '../models/proper-meet-profile/proper-meet-profile.model'

const createProperMeetProfile = async (payload: any) => {
    try {
        const createProperMeetProfile: any = await ProperMeetProfile.ProperMeetProfileModel.create(payload)
        if(createProperMeetProfile) {
            return createProperMeetProfile
        }
        throw Error(`Sorry some errors occurred while creating Proper Meet Profile`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const findAllProperMeetProfile = async () => {
    try {
        const findAllProperMeetProfile: any = await ProperMeetProfile.ProperMeetProfileModel.find({})
        if (findAllProperMeetProfile) {
            return findAllProperMeetProfile
        }
        throw new Error(`Proper Meet Profile details not found`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const findProperMeetProfileByHandle = async (handle: string) => {
    try {
        const findProperMeetProfileByHandle: any = await ProperMeetProfile.ProperMeetProfileModel.findOne({ handle })

        return findProperMeetProfileByHandle
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const updateProperMeetProfileMediaByHandle = async (handle: string, payload: any) => {
    try {
        const updateProperMeetProfileMediaByHandle: any = await ProperMeetProfile.ProperMeetProfileModel.findOneAndUpdate({ handle }, payload, { upsert: false, new: true })

        return updateProperMeetProfileMediaByHandle
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export default { createProperMeetProfile, findAllProperMeetProfile, findProperMeetProfileByHandle, updateProperMeetProfileMediaByHandle }
