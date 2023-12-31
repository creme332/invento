const express = require("express");
const router = express.Router();

// Require controller modules.
const item_controller = require("../controllers/itemController");
const category_controller = require("../controllers/categoryController");

router.get("/categories", category_controller.category_list);
router.get("/category/:id", category_controller.category_detail);
router.post("/category/create", category_controller.category_create_post);
router.post("/category/:id/update", category_controller.category_update_post);
router.post("/category/:id/delete", category_controller.category_delete_post);

router.get("/items", item_controller.item_list);
router.get("/items/recent/:count", item_controller.item_recent);
router.get("/items/total", item_controller.item_total);
router.get("/items/grouped-by-status", item_controller.item_by_status);
router.get("/items/grouped-by-category", item_controller.item_by_category);

router.get("/categories/total", category_controller.category_total);

router.get("/item/:id", item_controller.item_detail);
router.post("/item/create", item_controller.item_create_post);
router.post("/item/:id/update", item_controller.item_update_post);
router.post("/item/:id/delete", item_controller.item_delete_post);

module.exports = router;
