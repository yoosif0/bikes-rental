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


queryResolvers = {
    getBike: {
        type: BikeInDb,
        args: {
            bikeId: { type: GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, { bikeId }) {
            return bikeDb.getBikeById(bikeId)
        }
    },
    allBikes: {
        type: PaginatedCollectionType(BikeInDb),
        args: {
            skip: {
                name: "skip",
                type: GraphQLInt
            }
        },
        resolve(parent, { first, skip }) {
            const getDefaultQuery = new GetDefaultQuery(10, Number(skip || 0), Bike)
            return Promise.all([getDefaultQuery.getItems(), getDefaultQuery.getItemsCount()]).then(([bikes, count]) => ({ list: bikes, count }))
        }
    },
    getByLocationAndFilterExcludingReservedBikes: {
        type: new GraphQLList(BikeInDb),
        args: {
            ...alwaysThereBikeType, rateType, 
            ...locationType
        },
        resolve(parent, { model, color, maxWeight, minWeight, longitude, latitude, avgRate, isAvailable }) {
            return bikeDb.getByLocationAndFilterExcludingReservedBikes([], model, color, Number(maxWeight), Number(minWeight), Number(longitude), Number(latitude), Number(avgRate), isAvailable)
        }
    },

    getWithPaginationExcludingReservedBikes: {
        type: new GraphQLList(BikeInDb),
        args: {
            ...alwaysThereBikeType, 
            rateType, 
            skipType,
            startDate: {
                name: "startDate",
                type: GraphQLString
            },
            endDate: {
                name: "endDate",
                type: GraphQLString
            },
            
        },
        resolve(parent, { model, color, maxWeight, minWeight, avgRate, isAvailable, startDate, endDate, skip }) {
            return reservationDb.getClashedReseravtionsForDateRange(startDate, endDate)
                .then(reservations => {
                    const reservedBikes = reservations.length ? reservations.map(item => item.bikeId) : null
                    return bikeDb.getWithPaginationAndRatingExcludingReservedBikes(reservedBikes, model, color,
                        Number(maxWeight), Number(minWeight), 10, Number(skip || 0), Number(avgRate), isAvailable)
                })
        }
    }
}

mutationResolvers = {
    addBike: {
        type: BikeInDb,
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








