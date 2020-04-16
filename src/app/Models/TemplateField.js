'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TemplateField extends Model {

  static get table () {
    return 'template_fields';
  }

}

module.exports = TemplateField
