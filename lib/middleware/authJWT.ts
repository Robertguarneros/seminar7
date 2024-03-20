import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken';
import IJwtPayload from '../modules/JWTPayload';
import users  from '../modules/users/schema';
import posts from '../modules/posts/schema';


export class AuthJWT{


  // https://dev.to/kwabenberko/extend-express-s-request-object-with-typescript-declaration-merging-1nn5

  public async verifyToken (req: Request, res: Response, next: NextFunction) {
    console.log("verifyToken");
    const _SECRET: string = 'api+jwt';
    
    const token = req.header("x-access-token");
    if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    
    const decoded = jwt.verify(token, _SECRET) as IJwtPayload;
    console.log("verifyToken");
    req.userId = decoded.id;
    const user = await users.findById(req.userId, { password: 0 });
    console.log(user);
    if (!user) return res.status(404).json({ message: "No user found" });

    
    next();

  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

public async  isOwner (req: Request, res: Response, next: NextFunction) {
  try {
    const user = await users.findById(req.userId);

    const postId = req.params.id;
    const post = await posts.findById(postId);

    if (!post) return res.status(403).json({ message: "No user found" });

    if (post.author != req.userId) return res.status(403).json({ message: "Not Owner" });

    next();

  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};
}