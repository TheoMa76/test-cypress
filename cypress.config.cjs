const { defineConfig } = require("cypress");
const execa = require("execa");
const findBrowser = async () => {
  // the path is hard-coded for simplicity
  let browserPath =
    "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe";
  if (process.env.CI) {
    browserPath = "/usr/bin/google-chrome";
    return {
      name: "Chrome",
      video: true,
      videosFolder: "cypress/videos",
      channel: "stable",
      family: "chromium",
      displayName: "Chrome",
      version: "stable",
      path: browserPath,
      majorVersion: "stable",
    };
  }

  const result = await execa(browserPath, ["--version"]);
  // STDOUT will be like "Brave Browser 77.0.69.135"
  // const [, version] = /Brave Browser (\d+.\d+.\d+.\d+)/.exec(result.stdout);
  // const majorVersion = parseInt(version.split('.')[0]);
  return {
    name: "Brave",
    video: true,
    videosFolder: "cypress/videos",
    channel: "stable",
    family: "chromium",
    displayName: "Brave",
    version: "1.46.144",
    path: browserPath,
    majorVersion: "146144",
  };
};
module.exports = defineConfig({
  projectId: "testing-ci-cd-cypress",
  e2e: {
    async setupNodeEvents(on, config) {
      const browser = await findBrowser();
      return {
        browsers: config.browsers.concat(browser),
      };
    },
  },
});
