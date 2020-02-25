'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArticleSchema extends Schema {
  up () {
    this.create('articles', (table) => {
      table.increments();
      table.string('title');
      table.string('content').nullable();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('Users.id').onDelete('cascade');
      table.timestamps()
    })
  }

  down () {
    this.drop('articles')
  }
}

module.exports = ArticleSchema
