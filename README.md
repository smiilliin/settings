# Settings - Easier to load and write settings

## Usage

### Initialization

Initialize setting class

```ts
import SettingManager from "@smiilliin/settings";

const settingManager = new SettingManager("test-app");
```

### Set settings

Set setting file

```ts
settingManager.set("settings.json", {
  test: "hello world",
});
```

### Load settings

Create app directory and load setting

```ts
console.log(settingManager.load("settings.json"));
```

With default settings

```ts
console.log(settingManager.load("settings.json", { test2: "hi" }));
```

### Cretae app dir

Create app directory(not neccessary if already loaded setting)

```ts
settingManager.createDir();
```

### Get app dir

Get app directory

```ts
console.log(settingManager.getAppdir());
```
