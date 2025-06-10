import { existsSync, unlinkSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';

import { ErrorManager } from '../../../common/utils/errorManager';
import { envs } from '../../../common';

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

  const fileExptension = file.mimetype.split('/')[1];
  const validExtensions = ['pdf', 'PDF'];

  //TODO: Retornar error si no se encuentra la extension PDF o pdf
  if (validExtensions.includes(fileExptension)) {
    return callback(null, true);
  }

  callback(null, false);
};

export const storage = diskStorage({
  destination: envs.FOLDER_PDFS,

  filename: (req, file, cb) => {
    const extension = file.originalname.split('.').pop();
    const name = `${uuidv4()}.${extension}`;

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

export const removeFile = (file: Express.Multer.File) => {
  if (existsSync(file.path)) {
    unlinkSync(file.path);
  }
};
