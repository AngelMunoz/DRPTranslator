
const { FuseBox } = require("fuse-box");
const { src, task, exec, tsc } = require('fuse-box/sparky');

const tscConfig = {
  target: 'es5',
  declaration: true,
  outDir: 'dist/',
  lib: ['es6'],
  module: 'umd',
  charset: 'utf-8'
};

task('clean', async context => {
  await src('./dist')
    .clean('dist/')
    .exec();
});

task('build', async () => {
  await exec('clean');
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

task('default', async () => {
  await exec('build');
});


