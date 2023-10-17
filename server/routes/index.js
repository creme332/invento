const express = require("express");
const router = express.Router();

// Require controller modules.
const item_controller = require("../controllers/itemController");
const category_controller = require("../controllers/categoryController");

router.get("/categories", category_controller.category_list);
router.get("/category/:id", category_controller.category_detail);
router.post("/category/create", category_controller.category_create_post);
router.post("/categories/:id/update", category_controller.category_update_post);
router.post("/categories/:id/delete", category_controller.category_delete_post);

router.get("/items", item_controller.item_list);
router.get("/item/:id", item_controller.item_detail);
router.post("/item/create", item_controller.item_create_post);
router.post("/item/:id/update", item_controller.item_update_post);
router.post("/item/:id/delete", item_controller.item_delete_post);

module.exports = router;
