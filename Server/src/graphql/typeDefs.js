const graphql = require('graphql');
const Bike = require('../models/bike.model');
const Reservation = require('../models/reservation.model');
const Rating = require('../models/rating.model');
const User = require('../models/users.model');
const bikeDb = require('../data-layer/bike.db')



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



// const RatingType = new GraphQLObjectType({
//     name: 'Rating',
//     fields: () => ({
//         _id: { type: GraphQLID },
//         bike: {
//             type: BikeType,
//             resolve(parent, args) {
//                 return Bike.findById(parent.bikeId);
//             }
//         },
//         user: {
//             type: UserType,
//             resolve(parent, args) {
//                 return User.findById(parent.userId);
//             }
//         },
//         rate: { type: GraphQLInt }
//     })
// });




const alwaysThereBikeType = {
    model: { type: GraphQLNonNull(GraphQLString) },
    weight: { type: GraphQLNonNull(GraphQLInt) },
    color: { type: GraphQLNonNull(GraphQLString) },
    isAvailable: { type: GraphQLNonNull(GraphQLBoolean) },
    addressName: { type: GraphQLNonNull(GraphQLString) },
}
const locationType = {
    latitude: { type: GraphQLNonNull(GraphQLInt) },
    longitude: { type: GraphQLNonNull(GraphQLInt) },
}
const bikeInput = {
    ...alwaysThereBikeType,
    ...locationType
}

const rateType =  {  type: GraphQLInt   }
const skipType= {  type: GraphQLInt }


const BikeInDb = new GraphQLObjectType({
    name: 'Bike',
    fields: () => ({
        _id: { type: GraphQLID },
        ...alwaysThereBikeType, 
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLID },
        email: { type: GraphQLString },
    })
});
const PaginatedCollectionType = (collectionType) => new GraphQLObjectType({
    name: 'PaginatedCollection',
    fields: () => ({
        list: { type: new GraphQLList(collectionType) },
        count: { type: GraphQLInt },
    })
});
const ReservationType = new GraphQLObjectType({
    name: 'Reservation',
    fields: () => ({
        _id: { type: GraphQLID },
        bike: {
            type: BikeType,
            resolve(parent, args) {
                return Bike.findById(parent.bikeId);
            }
        },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId);
            }
        },
        startDate: { type: GraphQLInt },
        endDate: { type: GraphQLInt }
    })
});

const okType = new GraphQLObjectType({
    name: 'Ok',
    fields: () => ({
        ok: { type: GraphQLBoolean },
    })
});

module.exports = {PaginatedCollectionType, UserType, ReservationType, locationType, skipType, bikeInput, alwaysThereBikeType, rateType, BikeInDb, okType}