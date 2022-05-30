const authKeyModel = require(process.cwd() + '/models/index').AuthKey

async function index() {
    return authKeyModel.findAndCountAll()
}

async function showByUserId(user_id) {
    return authKeyModel.findOne({ where: { user_id: user_id } })
}

async function create(newAuthKey) {
    return authKeyModel.create(newAuthKey)
}

async function update(updateAuthKey, id) {
    return authKeyModel.update(updateAuthKey, { where: { id: id } })
}

async function destroy(id) {
    return authKeyModel.destroy({ where: { id: id } })
}

module.exports = {
    index: index,
    getAuthKeyByUserId: showByUserId,
    addNewAuthKey: create,
    updateAuthKeyById: update,
    deleteAuthKeyById: destroy,
}
