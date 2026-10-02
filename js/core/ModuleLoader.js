export default class ModuleLoader {
  static async loadIndustryModule(folderName) {
    try {
      const modulePath = `../../industries/${folderName}/main.js`;
      const module = await import(modulePath);
      return module.default;
    } catch (error) {
      console.error(`無法載入產業模組: ${folderName}`, error);
      return null;
    }
  }
}
