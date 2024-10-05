import { cleanEnv, str, url, bool } from "envalid";

const defaultViteEnc = {
  // vite defailt envs
  MODE: str({
    desc: "The environment mode",
    choices: ["development", "staging", "production"],
  }),
  BASE_URL: str({
    desc: "The URL the app is hosted at",
    example: "https://example.com",
  }),
  SSR: bool({
    desc: "Server side rendering",
    default: false,
  }),
};

export const env = cleanEnv(import.meta.env, {
  ...defaultViteEnc,
  VITE_APP_API_URL: url({
    desc: "The URL of the backend server",
    example: "https://api.example.com:4000",
  }),
});
