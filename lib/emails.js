const path = require('path');
const fs = require('fs');
const emlformat = require('eml-format');

const rootPath = path.resolve('../ses-mock');
const folderPath = path.join(rootPath, 'output');

export const getEmails = () => {
  try {
    const files = fs.readdirSync(folderPath);
    const fileObjects = files.map(file => {
      const emailPath = path.join(folderPath, file, 'content.eml');
      let ret = {
        filename: file.replace('.html', ''),
        stat: JSON.parse(JSON.stringify(fs.statSync(emailPath)))
      }
      return ret;
    });
    return fileObjects;
  } catch (error) {
    console.log(error);
    return {
      error,
      message: 'Failed in reading all files of emails'
    };
  }
};

/**
 * 
 * @param {string} uuid the uuid of email
 * @returns {Promise<Email>}
 */
export const getEmailById = async (uuid, callback) => {
  try {
    // Path: ses-mock/output/:uuid/content.eml
    const emailPath = path.join(folderPath, uuid, 'content.eml');
    const eml = fs.readFileSync(emailPath, 'utf-8');
    return emlformat.read(eml, callback);
    await emlformat.read(eml, (error, data) => {
      if (error) {
        console.log('error ==', error);
        return {
          error,
          message: 'Error in reading a specified email'
        };
      };
      console.log('getEmailById SUCCESS ===');
      console.log(data); //List of files
      return data;
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const removeEmailById = (uuid) => {
  const emailPath = path.join(folderPath, uuid);
  fs.stat(emailPath, function (error, stats) { 
    if (error) {
      console.error(error);
      return {
        error,
        message: 'Error in reading a specific email'
      };
    }
    fs.rmdir(emailPath, { recursive: true }, function(err){
      if (error) {
        console.error(error);
        return {
          error,
          message: 'Error in deleting a specific email'
        };
      };
      return { message: 'success' };
    });  
  });
};