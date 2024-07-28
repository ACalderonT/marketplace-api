import { Router } from 'express';
import { postController } from '../controllers/post.controller.js';
import { userController } from '../controllers/user.controller.js';
import { HandleLoginMiddleware } from '../middlewares/login/handleLogin.middleware.js';

const router = Router();

// router.method(route, middelware, controller);

// Posts
router.post("/posts", postController.create);
router.get("/posts", postController.allPosts);
router.get("/posts/:id", postController.findById);
router.get("/posts/:creator_id", postController.findByCreator);
router.delete("/posts/:id", postController.remove);
router.put("/posts/:id", postController.update);

// Users
router.post("/account", userController.create);
router.post("/login", HandleLoginMiddleware, userController.logIn);

// Favorites


// Categories


// CategoryPosts


export default router;