import { Application, Request, Response } from 'express';
import { UserController } from '../controllers/userController';
import { AuthController } from '../controllers/authController';

export class UserRoutes {

    private user_controller: UserController = new UserController();
    private auth_controller: AuthController = new AuthController();

    public route(app: Application) {
        
        app.post('', (req: Request, res: Response) => {
            this.user_controller.create_user(req, res);
        });

        app.get('/signin', (req: Request, res: Response) => {
            this.auth_controller.signin(req, res);
        });

        app.get('/:id', (req: Request, res: Response) => {
            this.user_controller.get_user(req, res);
        });

        app.put('/:id', (req: Request, res: Response) => {
            this.user_controller.update_user(req, res);
        });

        app.delete('/:id', (req: Request, res: Response) => {
            this.user_controller.delete_user(req, res);
        });

    }
}