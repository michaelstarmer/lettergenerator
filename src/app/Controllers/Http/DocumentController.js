'use strict'

const Helpers = use('Helpers');
const { base64_encode } = require('../../Helpers/Files');
const puppeteer = require('puppeteer');
const moment = require('moment');

const Env = use('Env');

const HOST = Env.get('APP_URL', 'http://lettergenerator.local');

const resourcesPath = Helpers.resourcesPath();
const pdfPath = resourcesPath+'/generated';
const appRoot = Helpers.appRoot();

const Template = use('App/Models/Template');
const TemplateField = use('App/Models/TemplateField');

const Route = use('Route')

class DocumentController {

  async pdf({request, response, view}) {
    

    const { templateID } = request.params;
    const template = await Template.find(templateID);

    const fields = request.post();

    const timestamp = moment().unix();

    const savePath = `${pdfPath}/PDF-${template.template_view}-${timestamp}`;

    console.log("Saving to:",savePath);
    console.log({fields})

    const address = HOST + Route.url('show_template', {templateID})

    const img = base64_encode(`${appRoot}/src/img/templates/vegvesen_logo.jpg`)
    
    try {
      
      const browser = await puppeteer.launch({args: ['--no-sandbox']});
      const pages = await browser.pages();

      const page = await browser.newPage();

      const content = view.render('templates/'+template.template_view, { 
        fields,
        img: base64_encode(`${appRoot}/src/img/templates/vegvesen_logo.jpg`)
      })

      console.log("Generating PDF...");
      await page.setContent(content);
      //await page.goto(`${content}`, {waitUntil: 'networkidle2'});

      await page.pdf({path: savePath, format: 'A4', printBackground: true});
  
      await browser.close();

      console.log("Done!");

      return view.render('generated-result', {url: `/documents/PDF-${template.template_view}-${timestamp}`});

    } catch (error) {
      console.log(error);
      return response.json({success:false, error});
    }

  }

  async fill_template({request, response, view}) {

    const { templateID } = request.params;

    
    try {
      const template = await Template.query().where('id', templateID).with('templateFields').first();

      const json = template.toJSON();
      const fields = json.templateFields;

      return view.render('customize', { templateID: template.id, fields});

    } catch (error) {

      console.log({error})

      return response.send({ status: "FAEEN!", error });
    }

  }

}


module.exports = DocumentController
