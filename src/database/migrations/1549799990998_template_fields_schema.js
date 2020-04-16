'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TemplateFieldsSchema extends Schema {
  up () {
    this.create('template_fields', (table) => {
      table.increments()
      table.integer('template_id').unsigned().references('id').inTable('templates')
      table.string('type', 80).notNullable()
      table.string('name', 80).notNullable()
      table.string('label', 80)
      table.string('placeholder', 80)
      table.timestamps()
    })
  }

  down () {
    this.drop('template_fields')
  }
}

module.exports = TemplateFieldsSchema
