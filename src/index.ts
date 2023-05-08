import fs from 'fs'

export type CSSDynamicImportPluginType = {
  directoryBase?: string;
  pattern?: RegExp;
  target?: string;
}

export const CSSDynamicImportPlugin = (options: CSSDynamicImportPluginType) => {
  const {
    directoryBase = 'dist/css',
    pattern = /https:\/\/.*\/img\//g,
    target = '../img/',
  } = options ?? {};

  return {
    apply: (compiler: any) => {
      if (compiler?.hooks && compiler?.hooks?.afterEmit) {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
          try {
            const dir = fs.readdirSync(directoryBase);
            for (const filename of dir) {
              if (filename.split('.').at(-1) !== 'css') continue;
              const filePath = directoryBase + '/' + filename;

              // Read the contents of the built file
              const contents = fs.readFileSync(filePath, 'utf-8');
              // Replace the string
              const newContents = contents.replace(pattern, target);

              // Write the modified contents back to the file
              fs.writeFileSync(filePath, newContents, 'utf-8');
            }
          } catch (error) {
            console.error('Css Parsing Error');
          }
        });
      }
    },
  };
};

export default CSSDynamicImportPlugin;