const usersModel = require('models/users.model')
const ObjectId = require('mongodb').ObjectID;
const { getDateIgnoringTimezone } = require('services/date-utility')

module.exports = (userId) => {
    const today = new Date(Date.now())
    const firstToday = getDateIgnoringTimezone(new Date(today.getFullYear(), today.getMonth(), today.getDate()))
    const tomorrow = getDateIgnoringTimezone(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1))
    return usersModel.aggregate([
        { $match: { _id: ObjectId(userId), } },
        { $unwind: "$meals" },
        { $replaceRoot: { newRoot: "$meals" } },
        { $match: { date: { "$gte": firstToday, "$lt": tomorrow } } },
        { $group: { _id: "1", total: { $sum: "$numOfCalories" } } }
    ]
    ).exec().then(x=>{
        if (x && x[0]) {
            return x[0].total
        }
    })
}
