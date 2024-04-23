/* tslint:disable */
// @ts-nocheck
import { writeFile, existsSync, mkdirSync } from "fs";
import getSecret from "./secrets";
require('dotenv').config({ path: '.env' });

const environment = process.argv.slice(2)[0].split('=')[1];

function writeFileUsingFS(targetPath: string, environmentFileContent: string) {
  writeFile(targetPath, environmentFileContent, function (err: any) {
    if (err) {
      console.log(err);
    }
    if (environmentFileContent !== "") {
      console.log(`wrote variables to ${targetPath}`);
    }
  });
}

// Providing path to the `environments` directory
const frontendEnvDirectory = "./frontend/src/environments";

// creates the `environments` directory if it does not exist
if (!existsSync(frontendEnvDirectory)) {
  mkdirSync(frontendEnvDirectory);
}

// Checks whether command line argument of `production` was provided signifying production mode
const isProduction = environment === "production";

//creates the `environment.prod.ts` and `environment.ts` file if it does not exist
writeFileUsingFS(isProduction ? `${frontendEnvDirectory}/environment.production.ts` : `${frontendEnvDirectory}/environment.development.ts`, "");

// Choose the correct targetPath based on the environment chosen
const targetPath = isProduction
  ? `${frontendEnvDirectory}/environment.production.ts`
  : `${frontendEnvDirectory}/environment.development.ts`;

// Actual content to be compiled dynamically and pasted into respective environment files
async function generateEnv() {
  return `
    export const environment = {
      production: ${isProduction},
      environment: '${environment}',
      apiUrl: '${isProduction ? process.env.API_URL : process.env.API_URL_PROD}',
      hassUrl: '${process.env.HASS_URL}',
      hassAccessToken: '${await getSecret("HASS_ACCESS_TOKEN")}',
      mealieUrl: '${process.env.MEALIE_URL}',
      mealieAccessToken: '${await getSecret("MEALIE_ACCESS_TOKEN")}'
    };
  `;
}

generateEnv().then((res) => {
  writeFileUsingFS(targetPath, res);
});
/* tslint:enable */
