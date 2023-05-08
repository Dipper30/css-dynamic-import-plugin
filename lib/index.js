"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSSDynamicImportPlugin = void 0;
const fs_1 = __importDefault(require("fs"));
const CSSDynamicImportPlugin = (options) => {
    const { directoryBase = 'dist/css', pattern = /https:\/\/.*\/img\//g, target = '../img/', } = options !== null && options !== void 0 ? options : {};
    return {
        apply: (compiler) => {
            if (compiler.hooks && compiler.hooks.afterEmit) {
                compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
                    try {
                        const dir = fs_1.default.readdirSync(directoryBase);
                        for (const filename of dir) {
                            if (filename.split('.').at(-1) !== 'css')
                                continue;
                            const filePath = directoryBase + '/' + filename;
                            // Read the contents of the built file
                            const contents = fs_1.default.readFileSync(filePath, 'utf-8');
                            // Replace the string
                            const newContents = contents.replace(pattern, target);
                            // Write the modified contents back to the file
                            fs_1.default.writeFileSync(filePath, newContents, 'utf-8');
                        }
                    }
                    catch (error) {
                        console.error('Css Parsing Error');
                    }
                });
            }
        },
    };
};
exports.CSSDynamicImportPlugin = CSSDynamicImportPlugin;
exports.default = exports.CSSDynamicImportPlugin;
