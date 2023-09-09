"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
var router = (0, express_1.Router)();
/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});
exports.default = router;
//# sourceMappingURL=users.js.map