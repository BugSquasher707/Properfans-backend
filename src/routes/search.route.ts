import express from 'express'

import SearchController from '../controllers/search.controller'



const router = express.Router()

router.get('/search/creators', SearchController.searchForCreators)
router.get('/search/users', SearchController.searchForUsers)





export = router;
