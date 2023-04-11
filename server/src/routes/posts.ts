import { Request, Response, Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { userMiddleware } from '../middlewares/userMiddleware';
import fs from 'fs';
import multer from 'multer';
import path from 'path';

const router = Router();

interface RequestWithFile extends Request {
  file: any; // 혹은 multer.File 타입
  files: any[];
}

try {
  fs.accessSync('uploads');
} catch (error) {
  console.error('업로드 폴더 생성');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자 추출(png)
      const basename = path.basename(file.originalname, ext); // 이름 추출(image)
      done(null, basename + '_' + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB 이하의 파일만 허용
});

const createPost = async (req: Request, res: Response) => {
  const { title, upVote, neutralVote, downVote, desc } = req.body;

  const user = res.locals.user;

  try {
    res.json({ success: '성공' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'something went wrong' });
  }
};

router.post(
  '/images',
  userMiddleware,
  authMiddleware,
  upload.array('postImages'),
  async (req: RequestWithFile, res: Response) => {
    console.log('req>>', req.files);

    // console.log('req.file.path>>> ', req.file);
    return res.json(req.files.map((file) => file.filename));
  }
);
router.post('/', userMiddleware, authMiddleware, createPost);

export default router;
