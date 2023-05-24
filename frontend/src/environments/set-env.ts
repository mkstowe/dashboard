/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;

  const devPath = './src/environments/environment.development.ts';
  const prodPath = './src/environments/environment.ts';

  const appVersion = require('../../package.json').version;
  require('dotenv').config({
    path: 'src/environments/.env',
  });

  // `environment.ts` file structure
  const devConfigFile = `export const environment = {
        hassUrl: '${process.env.HASS_URL}',
        hassAuthToken: {
            type: 'auth',
            access_token: '${process.env.HASS_ACCESS_TOKEN}'
        },
        apiUrl: '${process.env.API_URL}',
        mealieAuthToken: {
          type: 'auth',
          access_token: '${process.env.MEALIE_ACCESS_TOKEN}',
        },
        mealieUrl: '${process.env.MEALIE_URL}',
        appVersion: '${appVersion}',
        production: false,
    };
    `;

  // `environment.development.ts` file structure
  const prodConfigFile = `export const environment = {
        hassUrl: '${process.env.HASS_URL}',
        hassAuthToken: {
            type: 'auth',
            access_token: '${process.env.HASS_ACCESS_TOKEN}'
        },
        apiUrl: '${process.env.API_URL}',
        mealieAuthToken: {
          type: 'auth',
          access_token: '${process.env.MEALIE_ACCESS_TOKEN}',
        },
        mealieUrl: '${process.env.MEALIE_URL}',
        appVersion: '${appVersion}',
        production: true,
    };
    `;

  writeFile(devPath, devConfigFile, (err: Error) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        `Angular environment.development.ts file generated correctly at ${devPath} \n`
      );
    }
  });

  writeFile(prodPath, prodConfigFile, (err: Error) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        `Angular environment.ts file generated correctly at ${prodPath} \n`
      );
    }
  });
};

setEnv();
