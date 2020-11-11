const passwordFeature = require('@admin-bro/passwords')
const argon2 = require('argon2')
const { isAccessGranted } = require('../auth')
const User = require("../../app/models/User")

const resourceName = 'User'

const properties = {
    password: {
        isVisible: false,
    },
    plainTextPassword: {
        type: 'password',
        isVisible: {
            list: false,
            edit: true,
            filter: false,
            show: false,
        },
    },
}

const actions = {
    search: {
        isAccessible: isAccessGranted({ resourceName: resourceName, actionRequested: 'list' }),
    },
    show: {
        isAccessible: isAccessGranted({ resourceName: resourceName, actionRequested: 'show' }),
    },
    list: {
        isAccessible: isAccessGranted({ resourceName: resourceName, actionRequested: 'list' }),
    },
    new: {
        isAccessible: isAccessGranted({ resourceName: resourceName, actionRequested: 'edit' }),
        before: transformPassword,
    },
    edit: {
        isAccessible: isAccessGranted({ resourceName: resourceName, actionRequested: 'edit' }),
    },
    delete: {
        isAccessible: isAccessGranted({ resourceName: resourceName, actionRequested: 'delete' }),
    },
    bulkDelete: {
        isAccessible: isAccessGranted({ resourceName: resourceName, actionRequested: 'bulkDelete' }),
    },
}

const features = [
    passwordFeature({
        properties: {
            password: 'plainTextPassword',
            encryptedPassword: 'password',
        },
        hash: argon2.hash,
    }),
]


async function transformPassword(request) {
    if (request.payload.plainTextPassword) {
        request.payload = {
            ...request.payload,
            password: await argon2.hash(request.payload.plainTextPassword),
            plainTextPassword: undefined,
        }
    }

    return request
}

module.exports = {
    resource: User,
    options: {
        properties,
        actions,
    },
    features
};