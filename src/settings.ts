import path from "path";
import fs from "fs";

interface IFileWatch {
  file: string;
  func: () => void;
}
interface IWatchCallback {
  file: string;
  func: (options: IOptions) => void;
  defaultOption?: IOptions;
}
interface IOptions {
  [key: string]: any;
}

class SettingManager {
  static appdataDir =
    process.env.APPDATA ||
    (process.platform == "darwin" ? process.env.HOME + "/Library/Preferences" : process.env.HOME + "/.local/share");
  private appDir: string;
  private watchFileFuncs: Array<IFileWatch>;
  private watchCallbackFuncs: Array<IWatchCallback>;

  /**
   * Initialize
   * @param appName app name
   */
  constructor(appName: string) {
    this.appDir = path.join(SettingManager.appdataDir, appName);
    this.watchFileFuncs = new Array();
    this.watchCallbackFuncs = new Array();
  }
  /**
   * Create app directory and load setting
   * @param file file name
   * @param defaultSetting default setting
   * @returns file options
   */
  load(file: string, defaultSetting?: IOptions): IOptions {
    let options: IOptions = {};
    try {
      options = JSON.parse(fs.readFileSync(path.join(this.appDir, file)).toString());
    } catch {}

    if (defaultSetting) {
      const keys = Object.keys(defaultSetting);
      keys.forEach((key) => {
        if (!options[key]) options[key] = defaultSetting[key];
      });

      if (keys.length > 0) this.set(file, options);
    }

    return options;
  }
  /**
   * Set setting file
   * @param file file name
   * @param options file options
   */
  set(file: string, options: IOptions) {
    if (!fs.existsSync(this.appDir)) {
      this.createDir();
    }
    fs.writeFileSync(path.join(this.appDir, file), JSON.stringify(options));
  }
  /**
   * Set option
   * @param file file name
   * @param option option
   */
  setOption(file: string, key: string, option: any) {
    let options = this.load(file);
    options[key] = option;
    this.set(file, options);
  }
  /**
   * Make file watch callback
   * @param file file name
   */
  private makeWatch(file: string) {
    const func = () => {
      fs.watchFile(
        path.join(this.getAppdir(), file),
        (() => {
          this.watchCallbackFuncs
            .filter((element) => element.file === file)
            .forEach(({ func, defaultOption }) => {
              func(this.load(file, defaultOption));
            });
        }).bind(this)
      );
    };
    this.watchFileFuncs.push({
      file: file,
      func: func.bind(this),
    });
    func();
  }
  /**
   * Watch setting file
   * @param file file name
   * @param callback callback
   */
  watch(file: string, callback: (options: IOptions) => Promise<void> | void, defaultOption?: IOptions) {
    callback(this.load(file, defaultOption));
    this.watchCallbackFuncs.push({
      file: file,
      func: callback,
      defaultOption: defaultOption,
    });
    if (this.watchFileFuncs.findIndex((element) => element.file === file) == -1) {
      this.makeWatch(file);
    }
  }
  /**
   * Release watch
   * @param file file name
   */
  unwatch(file: string) {
    if (this.watchFileFuncs.findIndex((element) => element.file === file) != -1) {
      fs.unwatchFile(path.join(this.getAppdir(), file));
    }
  }
  /**
   * Release all watch
   */
  unwatchAll() {
    this.watchFileFuncs.forEach((element) => {
      this.unwatch(element.file);
    });
  }
  /**
   * Create app directory(not neccessary if already loaded setting)
   */
  createDir() {
    fs.mkdirSync(this.appDir, { recursive: true });
  }
  /**
   * Get app directory
   * @returns app directory
   */
  getAppdir() {
    return this.appDir;
  }
}

export default SettingManager;
