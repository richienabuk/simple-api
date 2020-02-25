'use strict';

const Article = use('App/Models/Article');

class ArticleController {
  async index({request, response}) {
    try {
      const reqData = request.all();
      const limit = reqData.limit || 20;
      const page = reqData.page || 1;

      let builder = Article.query().with('user');
      const articles = await builder
        .orderBy('id', 'desc')
        .paginate(page, limit);
      return response.status(200).json({articles});
    } catch (e) {
      return response
        .status(e.status)
        .send(e)
    }
  }

  async show({ params, response }) {
    const article = await Article.find(params.id);

    return response.json(article)
  }

  async store ({request, auth, response}) {
    try {
      let article = await auth.user.articles().create(request.all());
      await article.load('user');

      return response.status(201).json(article)
    } catch (e) {
      console.log(e)
    }
  }

  async update({ auth, params, request, response }){
      const article = await Article.find(params.id);
      article.title = request.input('title');
      article.content = request.input('content');

      await article.save();
      await article.load('user');

      return response.status(200).json(article)
  }

  async delete({auth, params, response}) {
    await Article.find(params.id).delete();

    return response.status(204).json({message: 'Article has been deleted'});
  }
}

module.exports = ArticleController;
