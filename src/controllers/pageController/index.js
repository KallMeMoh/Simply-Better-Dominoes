const path = require('path');

class PageController {
  constructor() {
    this.pageAliases = {
      home: 'home',
      login: 'login',
      signup: 'register',
      status: 'status',
      rooms: 'rooms',
      game: 'game',
    };
  }

  getPage(alias) {
    const fileName = this.pageAliases[alias];
    if (!fileName) {
      throw new Error(`Page alias "${alias}" not found`);
    }

    try {
      const pageObj = require(path.join(__dirname, fileName));
      return pageObj;
    } catch (e) {
      throw new Error(`Failed to load page "${alias}": ${e.message}`);
    }
  }
}

module.exports = PageController;
