const argon2 = require('argon2')

async function authentication(email, password, userModel, roleModel) {
    const user = await userModel.findOne({ email })

    if (!user) return false

    const matched = await argon2.verify(user.password, password)
    if (!matched) return false

    return {
        ...user._doc,
        role: await roleModel.findById(user.role),
    }
}

function authenticationClosure({ userModel, roleModel }) {
    return function (email, password) {
        return authentication(email, password, userModel, roleModel)
    }
}

// Policies
function isGranted(resourceName, actionRequested, role) {
    if (role.super_admin) return true
    
    function isActionGranted(actions, actionRequested) {
        return actions.some((action) => {
            if (action.action === '*') return true
            if (action.action === actionRequested) return true
    
            return false
        })
    }

    return role.grants.some((grant) => {
        if (grant.resource !== resourceName) return false

        return isActionGranted(grant.actions, actionRequested)
    })
}

function isAccessGranted({ resourceName, actionRequested }) {
    return ({ currentAdmin }) => {
        return isGranted(resourceName, actionRequested, currentAdmin.role)
    }
}
    
module.exports = {
    authenticationClosure,
    authentication,
    isAccessGranted
}
