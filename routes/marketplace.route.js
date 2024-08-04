const Router = require('express');
const postController = require('../controllers/post.controller');
const userController = require('../controllers/user.controller');
const HandleLoginMiddleware = require('../middlewares/login/handleLogin.middleware');
const authMiddleware = require('../middlewares/auth/auth.middleware');
const categoryController = require('../controllers/category.controller');

const router = Router();

// router.method(route, middelware, controller);
// Public routes
router.get("/posts", postController.allPosts);
router.get("/posts/:post_id", postController.findById);

// User
router.post("/account", userController.create);
router.post("/login", HandleLoginMiddleware, userController.logIn);

// Profile
router.get("/profile/account", authMiddleware, userController.read);
router.put("/profile/account", authMiddleware, userController.update);
router.post("/profile/posts", authMiddleware, postController.create);
router.get("/profile/posts", authMiddleware, postController.getAllByCreator);
router.delete("/profile/posts/:id", authMiddleware, postController.remove);
router.get("/profile/favorites", authMiddleware, postController.favorites);

// Filters
router.get("/categories", categoryController.getAllCategories);
router.get("/brands", postController.getAllBrands);
router.get("/price", postController.getPricesLimits);

module.exports = router;