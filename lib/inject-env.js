const fs = require('fs');
const { resolve } = require('path');

const stringify = require('dotenv-stringify');
const dotenv = require('dotenv');

function loadEnvFile(file) {
  return dotenv.parse(fs.readFileSync(file));
}

module.exports = ({_, env}) => {
  const [, cwd = '.'] = _; 

  if (!env) {
    throw new Error(
      'Insufficient arguments',
    )
  }

  const environment = env === 'dev' ? 'development' : env 

  try {
    const basePath = resolve(process.cwd(), cwd); 

    // .env file
    const serviceDefaultConfigurationFile = resolve(process.cwd(), `.env`)
    const serviceDefaultConfiguration = fs.existsSync(
      serviceDefaultConfigurationFile,
    )
      ? loadEnvFile(serviceDefaultConfigurationFile)
      : undefined


    // .env.${environment} file
    const serviceConfigurationFile = resolve(basePath, `.env.${environment}`);
    const serviceConfiguration = fs.existsSync(serviceConfigurationFile)
    ? loadEnvFile(serviceConfigurationFile)
    : undefined

    const configuration = {
      ...serviceDefaultConfiguration,
      ...serviceConfiguration
    }

    fs.writeFileSync(
      resolve(process.cwd(), '.env.service'),
      stringify(configuration),
    )

  } catch (error) {
    console.log(error)
    process.exit(-1)
  }
} 