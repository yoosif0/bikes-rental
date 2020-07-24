const { PaginatedCollectionType, UserType, BikeInDb, ReservationType, locationType, alwaysThereBikeType, rateType, skipType, bikeInput } = require('./typeDefs')
const graphql = require('graphql');
const Bike = require('../models/bike.model');
const bikeDb = require('../data-layer/bike.db')
const GetDefaultQuery = require('data-layer/get-default-query.db')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQlEnum,
    GraphQLBoolean
} = graphql;

mutationResolvers = {
    rateBike(req, res, next) {
        ratingsDb.createOrUpdateRating(req.decoded._id, req.params.bikeId, req.params.rate).then(()=> res.status(200).json(successMessage)).catch(err => next(err))
    },



    addBike: {
        type: okType,
        args: {
            ...bikeInput
        },
        resolve(parent, {model, weight, color, latitude, longitude, isAvailable, addressName}) {
            return bikeDb.createBike(model, weight, color, latitude, longitude, isAvailable, addressName)
        }
    },
    deleteBike: {
        type: BikeInDb,
        args: {
            id: { type: GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, { id }) {
            return bikeDb.deleteBike(id).then(x => console.log(x))
        }
    },
    updateBike: {
        type: BikeInDb,
        args: {
            bikeId: { type: GraphQLNonNull(GraphQLID) },
            ...bikeInput
        },
        resolve(parent, { bikeId, model, weight, color, latitude, longitude, isAvailable, addressName }) {
            return bikeDb.updateBike(bikeId, model, weight, color, latitude, longitude, isAvailable, addressName)
        }
    },
    updateBikeImage: {
        type: BikeInDb,
        args: {
            bikeId: { type: GraphQLNonNull(GraphQLID) },
            imageName: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve(parent, { bikeId, imageName }) {
            return bikeDb.updateBikeImage(bikeId, imageName)
        }
    }
}

module.exports = {
    queryResolvers, mutationResolvers
}








