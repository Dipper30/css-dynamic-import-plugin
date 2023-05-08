export declare type CSSDynamicImportPluginType = {
    directoryBase?: string;
    pattern?: RegExp;
    target?: string;
};
export declare const CSSDynamicImportPlugin: (options: CSSDynamicImportPluginType) => {
    apply: (compiler: any) => void;
};
export default CSSDynamicImportPlugin;
