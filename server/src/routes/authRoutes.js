import { Router } from 'express'; import { dangKy, dangNhap, thongTin } from '../controllers/authController.js'; import xacThuc from '../middleware/xacThuc.js';
const router = Router(); router.post('/dang-ky', dangKy); router.post('/dang-nhap', dangNhap); router.get('/thong-tin', xacThuc, thongTin); export default router;
