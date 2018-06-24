
const { FuseBox } = require("fuse-box");
const { src, task, tsc } = require('fuse-box/sparky');

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

task('clean', async context => {
  await src('./dist')
    .clean('dist/')
    .exec();
});

task('build', ['clean'], async () => {
  await tsc('src/lib', tscConfig);
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


