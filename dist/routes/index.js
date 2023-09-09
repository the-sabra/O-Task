"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app_1 = require("../app");
var router = (0, express_1.Router)();
/* GET home page. */
router.get("/", function (req, res, next) {
    res.sendFile("/public/index.html", { root: app_1.rootDir });
});
exports.default = router;
//# sourceMappingURL=index.js.map