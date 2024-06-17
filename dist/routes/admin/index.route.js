"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dashboard_route_1 = require("./dashboard.route");
var system_1 = require("../../config/system");
var topic_route_1 = require("./topic.route");
var song_route_1 = require("./song.route");
var upload_route_1 = require("./upload.route");
var adminRoutes = function (app) {
    var path = "/".concat(system_1.systemConfig.prefixAdmin);
    app.use("".concat(path, "/dashboard"), dashboard_route_1.dashboardRoutes);
    app.use("".concat(path, "/topics"), topic_route_1.topicRoutes);
    app.use("".concat(path, "/songs"), song_route_1.songRoutes);
    app.use("".concat(path, "/upload"), upload_route_1.uploadRoutes);
};
exports.default = adminRoutes;
