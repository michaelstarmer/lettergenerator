'use strict'

const Helpers = use('Helpers');
const puppeteer = require('puppeteer');
const moment = require('moment');
const { readFile } = require('../../Helpers/Files');
const Env = use('Env');

const HOST = Env.get('APP_URL', 'http://lettergenerator.local');

const resourcesPath = Helpers.resourcesPath();
const pdfPath = resourcesPath+'/generated';
const templatePath = resourcesPath+'/views/templates';

const Template = use('App/Models/Template');
const TemplateField = use('App/Models/TemplateField');

const Route = use('Route')

class MainController {

  async index({request, response, view}) {

    let existingTemplates = [];

    try {

      const templatesObj = await Template.query().with('templateFields').fetch();
      
      let templates;
      
      if(templatesObj)
        templates = templatesObj.toJSON();

      console.log({templates});

      // const allDocuments = await this._getDir(pdfPath);
      // const allTemplates = await this._getDir(templatePath);

      // for(let i of allTemplates) {
        
      //   if(i.split('.').length > 1) {
      //     i = i.split('.').slice(0, -1);
      //     existingTemplates.push({name: i, url: `${HOST}/pdf/${i}`})
      //   }
      // }

      return view.render('index', {templates});
    } catch (error) {
      console.log(error);
    }

  }

  async show_template({request, response, view}) {
    
    const templateID = request.params.templateID;
    const fields = {
      title: "Tittel/overskrift/div lololol",
      body: "the content!1"
    }

    const template = await Template.find(templateID);

    console.log("Showing template:", template.name)
    
    return view.render('templates/'+template.template_view, { fields });
  }

  

  async generated({request, view}) {
    return view.render('generated-result');
  }

  async serve_document({request, response}) {

    const { file } = request.params;
    console.log("Displaying file:", file)
    

    response.header('Content-disposition', 'inline; filename="' + file + '"');
    response.header('Content-type', 'application/pdf');

    return await readFile(`${pdfPath}/${file}`);
  }


}

module.exports = MainController