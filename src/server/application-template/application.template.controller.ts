import { NextFunction, Request, Response } from "express";
import { getConnection } from "typeorm";
import InvalidDataError from "../../utils/error/InvalidDataError";
import ApplicationTemplate from "./application.template.entity";
import ApplicationTemplateField from "./application.template.field.entity";

function load(applicationTemplate: ApplicationTemplate, req: Request) {
  applicationTemplate.name = req.body.name.trim();
  applicationTemplate.description = req.body.description;
  applicationTemplate.status = req.body.status;
  applicationTemplate.updatedAt = new Date();
  //   applicationTemplate.updatedBy = req.user.id;
}

function loadTemplateField(
  applicationTemplateField: ApplicationTemplateField,
  payload: any
) {
  applicationTemplateField.type = payload.type.trim();
  applicationTemplateField.label = payload.label.trim();

  if (payload.required === true || payload.required === false) {
    applicationTemplateField.required = payload.required;
  }
  // applicationTemplateField.metaDataTypeId = payload.metaDataTypeId;
  applicationTemplateField.order = payload.order;

  applicationTemplateField.updatedAt = new Date();
}

function create(req: Request, res: Response, next: NextFunction) {
  const reqTemplateFields = req.body.applicationTemplateFields || [];

  let applicationTemplate: any;
  return ApplicationTemplate.findOne({
    where: { name: req.body.name.trim() },
  })
    .then((result) => {
      console.log("result", result);
      if (result) {
        throw new InvalidDataError("Application Template already exists!");
      }

      const newApplicationTemplate: any = {};
      load(newApplicationTemplate, req);
      newApplicationTemplate.createdAt = new Date();
      //   newApplicationTemplate.createdBy = req.user.id;

      return getConnection()
        .createQueryBuilder()
        .insert()
        .into(ApplicationTemplate)
        .values(newApplicationTemplate)
        .execute();
    })
    .then((result) => {
      applicationTemplate = result;

      const promises: any = [];

      reqTemplateFields.forEach((templateField: any) => {
        const newField: any = {};
        loadTemplateField(newField, templateField);
        newField.createdAt = new Date();
        // newField.createdBy = req.user.id;
        // newField.updatedBy = req.user.id;
        newField.applicationTemplateId = applicationTemplate.id;
        // const appTempField = ApplicationTemplateField.create(newField);
        // promises.push(appTempField.save());
        promises.push(
          getConnection()
            .createQueryBuilder()
            .insert()
            .into(ApplicationTemplateField)
            .values(newField)
            .execute()
        );
      });

      return Promise.all(promises);
    })
    .then((results) => {
      const template = {
        ...applicationTemplate.dataValues,
        applicationTemplateFields: results,
      };
      return res.json(template);
    })
    .catch((e) => next(e));
}

export { create };
