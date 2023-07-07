# Settings - Easier to load and write settings

## Usage

Initialization

```ts
import Settings from "@smiilliin/settings";

const settings = new Settings("test-app");
```

Write settings

```ts
settings.set("settings.json", {
  test: "hello world",
});
```

Load settings

```ts
const settings = new Settings("test-app");

console.log(settings.load("settings.json"));
```
