import { existsSync, unlinkSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';

import { ErrorManager } from '../utils/errorManager';
import { envs } from '../configs';

export const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file)
    return callback(
      new ErrorManager.createSignatureError('File is empty'),
      false,
    );

  // Si es xlsx = 'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  const fileExptension = file.mimetype.split('/')[1];
  const validExtensions = [
    'pdf',
    'PDF',
    'jpg',
    'JPG',
    'jpeg',
    'JPEG',
    'png',
    'PNG',
    'xlsx',
    'XLSX',
  ];

  //TODO: Retornar error si no se encuentra la extension PDF o pdf
  if (validExtensions.includes(fileExptension)) {
    return callback(null, true);
  } else if (fileExptension.includes('sheet')) {
    return callback(null, true);
  }

  callback(null, false);
};

export const storage = diskStorage({
  destination: envs.FOLDER_PDFS,

  filename: (req, file, cb) => {
    const extension = file.originalname.split('.').pop();
    let name = `${uuidv4()}.${extension}`;

    if (
      extension !== 'pdf' &&
      extension !== 'PDF' &&
      extension !== 'xlsx' &&
      extension !== 'XLSX'
    ) {
      name = `login.${extension}`;
    }

    cb(null, name);
  },
});

export const removeFiles = (files: Express.Multer.File[]) => {
  files.forEach((file) => {
    if (existsSync(file.path)) {
      unlinkSync(file.path);
    }
  });
};

export const removeFile = (file: string) => {
  if (existsSync(file)) {
    unlinkSync(file);
  }
};
