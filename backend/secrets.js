const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const client = new SecretManagerServiceClient();

async function getSecret(secret_name) {
  if (process.env.NODE_ENV === "production") {
    const name = `projects/mkstowe-dash/secrets/${secret_name}/versions/latest`;
    const [secret] = await client.accessSecretVersion({ name });
    return Buffer.from(secret.payload.data).toString();
  } else {
    return process.env[secret_name];
  }
}

module.exports = getSecret;
