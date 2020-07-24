const bikeResolvers = require('./bikeResolvers')
const ratingResolvers = require('./ratingResolvers')

const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLSchema,
    buildSchema
} = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // reservation: {
        //     type: ReservationType,
        //     args: { _id: { type: GraphQLID } },
        //     resolve(parent, args) {
        //         return Reservation.findById(args.id);
        //     }
        // },
        // rating: {
        //     type: new GraphQLList(RatingType),
        //     resolve(parent, args) {
        //         return Rating.find({});
        //     }
        // },
        ...bikeResolvers.queryResolvers,
        // getUpcomingReservationsForUser: {
        //     type: new GraphQLList(ReservationType),
        //     args: {
        //         id: {
        //             name: "id",
        //             type: GraphQLID
        //         },
        //         skip: {
        //             name: "skip",
        //             type: GraphQLInt
        //         }
        //     },
        //     resolve(parent, { id, skip }) {
        //         return reservationDb.getUpcomingReservationsForUser(id, Number(skip || 0))
        //     }
        // }

    }
});


// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//         book: {
//             type: BookType,
//             args: { _id: { type: GraphQLID } },
//             resolve(parent, args){
//                 return Book.findById(args.id);
//             }
//         },
//         author: {
//             type: AuthorType,
//             args: { _id: { type: GraphQLID } },
//             resolve(parent, args){
//                 return Author.findById(args.id);
//             }
//         },
//         books: {
//             type: new GraphQLList(BookType),
//             resolve(parent, args){
//                 return Book.find({});
//             }
//         },
//         authors: {
//             type: new GraphQLList(AuthorType),
//             resolve(parent, args){
//                 return Author.find({});
//             }
//         }
//     }
// });

// const Mutation = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//         addAuthor: {
//             type: AuthorType,
//             args: {
//                 name: { type: GraphQLString },
//                 age: { type: GraphQLInt }
//             },
//             resolve(parent, args){
//                 let author = new Author({
//                     name: args.name,
//                     age: args.age
//                 });
//                 return author.save();
//             }
//         },
//         addBook: {
//             type: BookType,
//             args: {
//                 name: { type: new GraphQLNonNull(GraphQLString) },
//                 genre: { type: new GraphQLNonNull(GraphQLString) },
//                 author_Id: { type: new GraphQLNonNull(GraphQLID) }
//             },
//             resolve(parent, args){
//                 let book = new Book({
//                     name: args.name,
//                     genre: args.genre,
//                     author_Id: args.authorId
//                 });
//                 return book.save();
//             }
//         }
//     }
// });

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...bikeResolvers.mutationResolvers,
        ...ratingResolvers.mutationResolvers
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

// 5f19292aa2c8a223ec99b133