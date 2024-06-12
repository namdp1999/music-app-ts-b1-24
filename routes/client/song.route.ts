import { Router } from "express";
const router: Router = Router();

import * as controller from "../../controllers/client/song.controller";

router.get("/favorite", controller.favorite);

router.get("/:slugTopic", controller.list);

router.get("/detail/:slugSong", controller.detail);

router.patch("/like/:status/:songId", controller.like);

router.patch("/favorite/:status/:songId", controller.favoritePatch);

export const songRoutes: Router = router;