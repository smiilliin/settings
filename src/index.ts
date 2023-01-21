import Settings from "./settings";

const settings = new Settings("test-app");

console.log(settings.load("settings.json"));
// settings.set("settings.json", {
//   test: 1,
// });
