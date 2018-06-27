
const { FuseBox } = require("fuse-box");
const { src, task, tsc, context } = require('fuse-box/sparky');

const tscConfig = {
  target: "es5",
  module: "umd",
  declaration: true,
  outDir: "dist",
  lib: [
    "es2015",
  ],
  charset: "utf-8"
};
const instruction = `>index.ts`;

context({
  getConfig() {
    return FuseBox.init({
      homeDir: "src/lib",
      output: "dist/$name.js",
      target: this.target || 'browser@es5',
      plugins: [],
      natives: {
        process: false,
        stream: false,
        Buffer: false,
        http: false,
      },
      tsConfig: [{ types: true }],
      sourceMaps: true
    });
  }
})


task('clean', async context => {
  await src('./dist')
    .clean('dist/')
    .exec();
});

task('build', ['clean'], async context => {
  const browser = context.getConfig();
  context.target = "server@es2017"
  const server = context.getConfig();
  browser.bundle("index.browser").instructions(instruction);
  server.bundle("index").instructions(instruction);
  await browser.run()
  await server.run()
});

task('test', async () => {
  await FuseBox.init({
    homeDir: "src",
    target: 'server@esnext',
    output: "../dist/$name.js",
    tsConfig: "./tsconfig.json"
  })
    .bundle('tests')
    .test('[tests/**/**.test.ts]')
})

task('default', ['build']);


