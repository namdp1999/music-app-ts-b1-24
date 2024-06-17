"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFields = exports.uploadSingle = void 0;
var uploadToCloudinary_helper_1 = require("../../helpers/uploadToCloudinary.helper");
var uploadSingle = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var link;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req["file"]) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, uploadToCloudinary_helper_1.uploadToCloudinary)(req["file"].buffer)];
            case 1:
                link = _a.sent();
                req.body[req["file"].fieldname] = link;
                next();
                return [3 /*break*/, 3];
            case 2:
                next();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.uploadSingle = uploadSingle;
var uploadFields = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _i, key, links, _d, _e, item, link, error_1;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = req["files"];
                _b = [];
                for (_c in _a)
                    _b.push(_c);
                _i = 0;
                _f.label = 1;
            case 1:
                if (!(_i < _b.length)) return [3 /*break*/, 9];
                _c = _b[_i];
                if (!(_c in _a)) return [3 /*break*/, 8];
                key = _c;
                links = [];
                _d = 0, _e = req["files"][key];
                _f.label = 2;
            case 2:
                if (!(_d < _e.length)) return [3 /*break*/, 7];
                item = _e[_d];
                _f.label = 3;
            case 3:
                _f.trys.push([3, 5, , 6]);
                return [4 /*yield*/, (0, uploadToCloudinary_helper_1.uploadToCloudinary)(item.buffer)];
            case 4:
                link = _f.sent();
                links.push(link);
                return [3 /*break*/, 6];
            case 5:
                error_1 = _f.sent();
                console.log(error_1);
                return [3 /*break*/, 6];
            case 6:
                _d++;
                return [3 /*break*/, 2];
            case 7:
                req.body[key] = links;
                _f.label = 8;
            case 8:
                _i++;
                return [3 /*break*/, 1];
            case 9:
                next();
                return [2 /*return*/];
        }
    });
}); };
exports.uploadFields = uploadFields;
