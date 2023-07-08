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
  it(`Set a option`, () => {
    const data = "hiii";
    settingManager.setOption("test.json", "test3", data);
    const { test3 } = settingManager.load("test.json");
    assert(data === test3);
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
  it(`Delete option`, () => {
    settingManager.set("test.json", { a: "asdf" });
    settingManager.deleteOption("test.json", "a");

    assert(!settingManager.load("test.json").a);
  });
  it(`Delete option file`, () => {
    settingManager.delete("test.json");

    assert(Object.keys(settingManager.load("test.json")).length == 0);
  });
  it(`Watch options and set options`, async () => {
    const data = await new Promise<any>((resolve) => {
      settingManager.watch("test.json", (data) => {
        resolve(data);
      });

      settingManager.setOption("test.json", "hi", "hi");
    });

    assert(data);
  }).timeout(10000);
  it(`Watch options and set options with default option`, async () => {
    const data = await new Promise<any>((resolve) => {
      settingManager.watch(
        "test.json",
        (data) => {
          resolve(data);
        },
        { a: "hi" }
      );

      settingManager.setOption("test.json", "hi", "hello");
    });

    assert(data);
    assert(data.a === "hi");
  }).timeout(10000);
  it(`Unwatch`, () => {
    settingManager.unwatch("test.json");
  });
});
