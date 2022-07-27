import { Request, Response } from 'express'

import BrandTierService from "../services/brand-tier.service"

const createBrandTier = async (req: Request, res: Response) => {
    try {
        const clubId = req.params.clubId
        const payload = { clubId, body: {...req.body, clubId} }

        await BrandTierService.createBrandTier(payload).then((brandTierCreateResponse: any) => {
            return res.status(200).send({
                status: true,
                data: brandTierCreateResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const getBrandTierByHandle = async (req: Request, res: Response) => {
    try {
        const handle: any = req.params.handle
        await BrandTierService.findBrandTierByHandle(handle).then((findBrandByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findBrandByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const getBrandSpecificTier = async (req: Request, res: Response) => {
    try {
        const handle: any = req.params.handle
        const tier: any = req.params.tier

        const query = { handle, tier }

        await BrandTierService.findSpecificBrandTier(query).then((findBrandByIdResponse: any) => {
            return res.status(200).send({
                status: true,
                data: findBrandByIdResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const createBrandSubscription = async (req: Request, res: Response) => {
    try {
        const clubTierId = req.params.clubTierId
        const userId = req.body.userId
        return await BrandTierService.createBrandSubscription(clubTierId, userId)
        .then((data: any) => {
            return res.status(201).send({
                data: data
            })
        })
    } catch (error: any) {
        return res.status(error.status | 400).send({
            message: error.message
        })
    }
}

const deleteBrandSubscription = async (req: Request, res: Response) => {
    try {
        const clubTierId = req.params.clubTierId
        const clubSubscriptionId = req.params.clubSubscriptionId
        return await BrandTierService.deleteBrandSubscription(clubTierId, clubSubscriptionId)
        .then(() => {
            return res.status(200).send({
                data: `Subscription with id ${clubSubscriptionId} removed`
            })
        })
    } catch (error: any) {
        return res.status(error.status | 400).send({
            message: error.message
        })
    }
}

const getBrandSubscriptionsByTier = async (req: Request, res: Response) => {
    try {
        const clubTierId = req.params.clubTierId
        const filters = req.body
        return await BrandTierService.getBrandSubscriptionsByTier(clubTierId, filters)
        .then((data: any) => {
            return res.status(200).send({
                data: data
            })
        })
    } catch (error: any) {
        return res.status(error.status | 400).send({
            message: error.message
        })
    }
}
const getAllClubTiers = async (req: Request, res: Response) => {
    try {
        const brandId: any = req.params.brandId
        await BrandTierService.getAllClubTiers(brandId).then((getAllClubTiersResponse: any) => {
            return res.status(200).send({
                status: true,
                data: getAllClubTiersResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const getSingleClubTier = async (req: Request, res: Response) => {
    try {
        const brandId: any = req.params.brandId
        const tier: any = req.params.tier

        await BrandTierService.getSingleClubTier(brandId, tier).then((getSingleClubTiersResponse: any) => {
            return res.status(200).send({
                status: true,
                data: getSingleClubTiersResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

const updateClubTier = async (req: Request, res: Response) => {
    try {
        const brandId: any = req.params.brandId
        const tier: any = req.params.tier
        const payload: any = req.body

        await BrandTierService.updateClubTier(brandId, tier, payload).then((updateClubTierResponse: any) => {
            return res.status(200).send({
                status: true,
                data: updateClubTierResponse
            })
        })
    } catch (error: any) {
        return res.status(404).send({
            status: false,
            message: error.message
        })
    }
}

export default { createBrandTier, getBrandTierByHandle, getBrandSpecificTier, createBrandSubscription, deleteBrandSubscription, getBrandSubscriptionsByTier,getAllClubTiers,getSingleClubTier,updateClubTier }
