'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TemplatesSchema extends Schema {
  up () {
    this.create('templates', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table.string('template_view', 80)
      table.timestamps()
    })
  }

  down () {
    this.drop('templates')
  }
}

module.exports = TemplatesSchema
