'use strict'

const User = use('App/Models/User');

class AuthController {
  async register({request, auth, response}) {
    try {
      // getting data passed within the request
      const data = request.only(['username', 'email', 'password']);

      // looking for user in database
      const userExists = await User.findBy('email', data.email);

      // if user exists don't save
      if (userExists) {
        return response
          .status(400)
          .send({ message: { error: 'User already registered' } })
      }

      // if user doesn't exist, proceeds with saving details in DB
      let user = await User.create(data);
      //generate token for user;
      let token = await auth.generate(user);
      Object.assign(user, token);
      return response.json(user)
    } catch (e) {
      return response
        .status(e.status)
        .send(e)
    }
  }

  show ({ auth, params, response }) {
    /*if (auth.user.id !== Number(params.id)) {
      return response.json({ message: 'You cannot see someone else\'s profile' })
    }*/
    return response.json(auth.user)
  }

  async login({request, auth, response}) {

    let {email, password} = request.all();

    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy('email', email);
        let token = await auth.generate(user);

        Object.assign(user, token);
        return response.json(user)
      }
    }
    catch (e) {
      console.log(e)
      return response.json({message: 'You are not registered!'})
    }
  }
}

module.exports = AuthController;
