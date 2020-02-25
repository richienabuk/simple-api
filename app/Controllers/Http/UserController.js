'use strict'

const User = use('App/Models/User')

class UserController {
  async index ({request, response}) {
    try {
      const reqData = request.all();
      const limit = reqData.limit || 20;
      const page = reqData.page || 1;

      let builder = User.query();
      const users = await builder
        .orderBy('id', 'desc')
        .paginate(page, limit);
      return response.status(200).json({users});
    } catch (e) {
      return response
        .status(e.status)
        .send(e)
    }
  }
}

module.exports = UserController;
