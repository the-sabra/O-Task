"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get404 = void 0;
const app_1 = require("../app");
const get404 = (req, res, next) => {
    res.status(404).sendFile("/public/error.html", { root: app_1.rootDir });
};
exports.get404 = get404;
//# sourceMappingURL=error.js.map