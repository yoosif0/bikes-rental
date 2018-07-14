const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ROLES = require('config/rolesConstants')

const roles_enum = {
    values: [ROLES.regular, ROLES.manager],
    message: '`{VALUE}` is not a valid user role.'
};

const usersSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: false, trim: true, index: true, unique: true, sparse: true },
    password: { type: String, required: false },
    role: { type: String, enum: roles_enum, required: true, default: 'regular' },
    recoveryCode: { type: String, required: false },
});

module.exports = usersSchema