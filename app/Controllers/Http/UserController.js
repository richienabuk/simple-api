'use strict'

const User = use('App/Models/User')

class UserController {
  async index ({ request, response }) {
    try {
      let users = await User.all();

      return response.json(users)
    } catch (e) {
      return response
        .status(e.status)
        .send(e)
    }
  }
}

module.exports = UserController;
