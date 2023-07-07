# Settings - Easier to load and write settings

## Usage

### Initialization

Initialize setting class

```ts
import SettingManager from "@smiilliin/settings";

const settingManager = new SettingManager("test-app");
```

### Set

Set setting file

```ts
settingManager.set("settings.json", {
  test: "hello world",
});
```

### SetOption

Set option

```ts
settingManager.setOption("settings.json", "test", "hello world");
```

### Load

Create app directory and load setting

```ts
console.log(settingManager.load("settings.json"));
```

With default settings

```ts
console.log(settingManager.load("settings.json", { test2: "hi" }));
```

### Watch

Watch setting file

```ts
settingManager.watch("setting.json", (setting) => {
  console.log(setting);
});
```

With default settings

```ts
settingManager.watch(
  (setting) => {
    console.log(setting);
  },
  { test: "hello world" }
);
```

### Unwatch

Release watch

```ts
settingManager.unwatch("setting.json");
```

Release all watch
settingManager.unwatchAll();

### CreateDir

Create app directory(not neccessary if already loaded setting)

```ts
settingManager.createDir();
```

### GetAppdir

Get app directory

```ts
console.log(settingManager.getAppdir());
```
