import { Router } from 'express';
import { postController } from '../controllers/post.controller.js';
import { userController } from '../controllers/user.controller.js';
import { HandleLoginMiddleware } from '../middlewares/login/handleLogin.middleware.js';
import { authMiddleware } from '../middlewares/auth/auth.middleware.js';

const router = Router();

// router.method(route, middelware, controller);
// Public routes
router.get("/posts", postController.allPosts);

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

export default router;