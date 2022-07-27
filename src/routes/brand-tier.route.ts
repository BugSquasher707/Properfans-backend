import express from 'express'

import BrandTierController from '../controllers/brand-tiers.controller'

const router = express.Router()

router.get('/clubTier/handle/:handle', BrandTierController.getBrandTierByHandle)
router.get('/clubTier/specific/handle/:handle/tier/:tier', BrandTierController.getBrandSpecificTier)
router.post('/clubTier/:clubId', BrandTierController.createBrandTier)

router.get('/clubTier/:clubTierId/subscriptions', BrandTierController.getBrandSubscriptionsByTier)
router.put('/clubTier/:clubTierId/subscriptions', BrandTierController.createBrandSubscription)
router.delete('/clubTier/:clubTierId/subscriptions/:clubSubscriptionId', BrandTierController.deleteBrandSubscription)
router.get('/clubTier/:brandId', BrandTierController.getAllClubTiers)
router.get('/club/tier/:tier/:brandId', BrandTierController.getSingleClubTier)

// Update Club Tier
router.put('/club/tier/:tier/:brandId', BrandTierController.updateClubTier)

export default router
