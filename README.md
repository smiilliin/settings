# Settings

Settings makes it easier to load and write settings!

## Example

Write settings

```ts
import Settings from "./settings";

const settings = new Settings("test-app");

settings.set("settings.json", {
  test: "hello world",
});
```

Load settings

```ts
import Settings from "./settings";

const settings = new Settings("test-app");

console.log(settings);
```
