import { Router } from 'express';
import { postController } from '../controllers/post.controller.js';
import { userController } from '../controllers/user.controller.js';
import { HandleLoginMiddleware } from '../middlewares/login/handleLogin.middleware.js';
import { authMiddleware } from '../middlewares/auth/auth.middleware.js';

const router = Router();

// router.method(route, middelware, controller);

// Posts
router.post("/posts", authMiddleware, postController.create);
router.get("/posts", postController.allPosts);
router.get("/posts/:id", postController.findById);
router.get("/posts/:creator_id", postController.findByCreator);
router.delete("/posts/:id", postController.remove);
router.put("/posts/:id", postController.update);

// User
router.post("/account", userController.create);
router.post("/login", HandleLoginMiddleware, userController.logIn);

// Profile
router.get("/profile/account", authMiddleware, userController.read);
router.put("/profile/account", authMiddleware, userController.update);
router.get("/profile/posts", authMiddleware);
router.post("/profile/new_post", authMiddleware);
router.get("/profile/favorites", authMiddleware);


// Categories


// CategoryPosts


export default router;