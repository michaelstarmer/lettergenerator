'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Template extends Model {

  templateFields () {
    return this.hasMany('App/Models/TemplateField');
  }

}

module.exports = Template
