/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import { boardRoutes } from '~/routes/v1/boardRoute'

const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({message: 'API v1'})
})

router.use('/boards', boardRoutes)

export const API_v1 = router