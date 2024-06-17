import { Express } from "express";
import { dashboardRoutes } from "./dashboard.route";
import { systemConfig } from "../../config/system";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { uploadRoutes } from "./upload.route";

const adminRoutes = (app: Express): void => {

  const path = `/${systemConfig.prefixAdmin}`;
  
  app.use(`${path}/dashboard`, dashboardRoutes);

  app.use(`${path}/topics`, topicRoutes);

  app.use(`${path}/songs`, songRoutes);

  app.use(`${path}/upload`, uploadRoutes);

};

export default adminRoutes;