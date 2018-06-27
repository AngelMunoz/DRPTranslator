
const { FuseBox } = require("fuse-box");
const { src, task, tsc, context } = require('fuse-box/sparky');

const tscConfig = {
  target: "es2015",
  module: "commonjs",
  declaration: true,
  outDir: "dist",
  charset: "utf-8",
  moduleResolution: "node",
  lib: [
    "es2015"
  ]
};


task('clean', async () => {
  await src('./dist')
    .clean('dist/')
    .exec();
});

task('build', ['clean'], async () => {
  await tsc('src/lib', tscConfig)
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


