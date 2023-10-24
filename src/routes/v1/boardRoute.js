/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import { boardValidation } from '~/validations/boardValidation'

const router = express.Router()

router.route('/')
    .get((req, res) => {
        res.status(200).json({message: 'API Get Board v1'})
    })
    .post( boardValidation.createNew, (req, res) => {
        res.status(201).json({message: 'API Post Board v1'})
    })

export const boardRoutes = router
