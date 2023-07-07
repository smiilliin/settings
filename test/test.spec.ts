import assert from "assert";
import fs from "fs";
import SettingManager from "../src/settings";

describe(`Settings`, () => {
  const settingManager = new SettingManager("test-app");
  it(`Get app directory`, () => {
    assert(settingManager.getAppdir());
  });
  it(`Create setting folder`, () => {
    settingManager.createDir();

    assert(fs.existsSync(settingManager.getAppdir()));
  });
  it(`Set and Load`, () => {
    const setting: any = {
      test: "hello world",
      test2: "hi!",
    };
    settingManager.set("test.json", setting);
    const loadedSetting = settingManager.load("test.json");

    Object.keys(setting).forEach((key) => {
      assert(loadedSetting[key] === setting[key]);
    });
  });
  it(`Default options`, () => {
    const defaultSettings: any = {
      hello: "hello world",
      hi: "hi!",
    };
    settingManager.load("test.json", defaultSettings);

    const loadedSetting = settingManager.load("test.json");

    assert(loadedSetting);

    Object.keys(defaultSettings).forEach((key) => {
      assert(loadedSetting[key] === defaultSettings[key]);
    });
  });
});
