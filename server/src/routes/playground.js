const express = require("express");
const asyncHandler = require("../middlewares/asyncHandler.middleware");
const validation = require("../middlewares/validation.middleware");
const playgroundValidationSchema = require("../validation/playground.validation");
const playgroundController = require("../controllers/playground.controller");
const authMiddleware = require("../middlewares/authencation.middleware");

const router = express.Router();

router.get("/attractions", asyncHandler(playgroundController.getAttractions));
router.get("/areas", asyncHandler(playgroundController.getAllAreas));
router.get(
  "/",
  validation.validationQuery(playgroundValidationSchema.getPlaygrounds),
  asyncHandler(playgroundController.getPlayground)
);
router.get(
  "/filter",
  validation.validationQuery(playgroundValidationSchema.filterPlayground),
  asyncHandler(playgroundController.filterPlayground)
);
router.get(
  "/:id/reviews",
  validation.validationQuery(playgroundValidationSchema.getReviews),
  asyncHandler(playgroundController.getReviews)
);
router.post(
  "/:id/reviews",
  authMiddleware,
  validation.validationBody(playgroundValidationSchema.postReview),
  asyncHandler(playgroundController.postReview)
);

router.get(
  "/favorites",
  authMiddleware,
  validation.validationQuery(playgroundValidationSchema.getPlaygrounds),
  asyncHandler(playgroundController.getFavorites)
);
// API lấy thông tin chi tiết sân chơi
router.get("/:id", asyncHandler(playgroundController.getPlaygroundDetails));

// API quản lý danh sách yêu thích
router.post(
  "/favorites",
  authMiddleware,
  asyncHandler(playgroundController.addToFavorites)
);
router.delete(
  "/favorites/:playgroundId",
  authMiddleware,
  asyncHandler(playgroundController.removeFromFavorites)
);

module.exports = router;
