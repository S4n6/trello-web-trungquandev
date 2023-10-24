/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { MongoClient, ServerApiVersion } from 'mongodb'
import {env} from '~/config/environment'


const MONGODB_URI = env.MONGODB_URI
const DATABASE_NAME = env.DATABASE_NAME

let trelloDatabaseInstance = null

const mongoClientInStance = new MongoClient(MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
}) 

export const CONNECT_DB = async () => {
    await mongoClientInStance.connect()
    trelloDatabaseInstance = mongoClientInStance.db(DATABASE_NAME)
}

export const GET_DB = () => {
    if( !trelloDatabaseInstance ) throw new Error('Must connect to Database')
    return trelloDatabaseInstance
}