'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FieldsInputSchema extends Schema {
  up () {
    this.table('template_fields', (table) => {
      // alter table
      table.string('value', 80).defaultsTo('').after('placeholder')
    })
  }

  down () {
    this.table('template_fields', (table) => {
      // reverse alternations
      table.dropColumn('value')
    })
  }
}

module.exports = FieldsInputSchema
