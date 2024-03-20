import { Application, NextFunction, Request, Response } from 'express';
import { PostController } from '../controllers/postController';
import { AuthJWT } from '../middleware/authJWT';

export class PostRoutes {

    private post_controller: PostController = new PostController();
    private auth_jwt: AuthJWT = new AuthJWT();

    public route(app: Application) {
        
        app.post('/post', (req: Request, res: Response, next: NextFunction) => {
            console.log('create post');
            this.auth_jwt.verifyToken(req, res, () => {
                this.post_controller.createPost(req, res);
            });
        });

        app.get('/post/:id', (req: Request, res: Response) => {
            this.post_controller.getPost(req, res);
        });

        app.put('/post/:id', (req: Request, res: Response, next: NextFunction) => {
            console.log('update post');
            this.auth_jwt.verifyToken(req, res, (err) => {
                if (err) return next(err);
                this.auth_jwt.isOwner(req, res, (err) => {
                    if (err) return next(err);
                    this.post_controller.updatePost(req, res);
                });
            });
        });

        app.delete('/post/:id', (req: Request, res: Response) => {
            this.post_controller.deletePost(req, res);
        });

    }
}