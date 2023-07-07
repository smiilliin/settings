import path from "path";
import fs from "fs";

class SettingManager {
  static appdataDir =
    process.env.APPDATA ||
    (process.platform == "darwin" ? process.env.HOME + "/Library/Preferences" : process.env.HOME + "/.local/share");
  private appDir: string;

  constructor(appName: string) {
    this.appDir = path.join(SettingManager.appdataDir, appName);
  }
  load(fileName: string, defaultSetting?: any): any {
    let fileData: any = {};
    try {
      fileData = JSON.parse(fs.readFileSync(path.join(this.appDir, fileName)).toString());
    } catch {}

    if (defaultSetting) {
      const keys = Object.keys(defaultSetting);
      keys.forEach((key) => {
        if (!fileData[key]) fileData[key] = defaultSetting[key];
      });

      if (keys.length > 0) this.set(fileName, fileData);
    }

    return fileData;
  }
  set(fileName: string, data: any) {
    if (!fs.existsSync(this.appDir)) {
      this.createDir();
    }
    fs.writeFileSync(path.join(this.appDir, fileName), JSON.stringify(data));
  }
  createDir() {
    fs.mkdirSync(this.appDir, { recursive: true });
  }
  getAppdir() {
    return this.appDir;
  }
}

export default SettingManager;
