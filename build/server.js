"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
require("express-async-errors");
var routes_1 = require("./routes");
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, cors_1["default"])());
app.use(routes_1.routes);
app.use(function (err, request, response, next) {
    var _a, _b;
    if (err instanceof Error) {
        console.log(err);
        return (_a = response === null || response === void 0 ? void 0 : response.status(400)) === null || _a === void 0 ? void 0 : _a.json({
            message: JSON.stringify(err.message)
        });
    }
    return (_b = response === null || response === void 0 ? void 0 : response.status(500)) === null || _b === void 0 ? void 0 : _b.json({
        status: 'error',
        message: 'Internal server error'
    });
});
app.get('/', function (request, response) {
    return response.json({
        message: 'Hello World'
    });
});
app.listen(process.env.PORT || 80, function () { return console.log('Server is running'); });
//# sourceMappingURL=server.js.map