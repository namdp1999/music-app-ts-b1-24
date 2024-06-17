"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var database_1 = require("./config/database");
var index_route_1 = __importDefault(require("./routes/admin/index.route"));
var index_route_2 = __importDefault(require("./routes/client/index.route"));
var system_1 = require("./config/system");
var path_1 = __importDefault(require("path"));
var body_parser_1 = __importDefault(require("body-parser"));
var method_override_1 = __importDefault(require("method-override"));
(0, database_1.connect)();
var app = (0, express_1.default)();
var port = "".concat(process.env.PORT) || 3000;
app.use((0, method_override_1.default)('_method'));
app.set('views', "".concat(__dirname, "/views"));
app.set("view engine", "pug");
app.use(express_1.default.static("".concat(__dirname, "/public")));
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
// TinyMCE
app.use("/tinymce", express_1.default.static(path_1.default.join(__dirname, "node_modules", "tinymce")));
// End TinyMCE
// App Local Variables
app.locals.prefixAdmin = system_1.systemConfig.prefixAdmin;
(0, index_route_1.default)(app);
(0, index_route_2.default)(app);
app.listen(port, function () {
    console.log("App listening on port ".concat(port));
});
