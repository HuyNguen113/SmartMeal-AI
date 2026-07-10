import 'dotenv/config';
import express from 'express'; import cors from 'cors'; import helmet from 'helmet'; import morgan from 'morgan';
import ketNoiDB from './config/db.js'; import xuLyLoi from './middleware/xuLyLoi.js';
import authRoutes from './routes/authRoutes.js'; import monAnRoutes from './routes/monAnRoutes.js'; import donDatRoutes from './routes/donDatRoutes.js'; import duBaoRoutes from './routes/duBaoRoutes.js'; import thongKeRoutes from './routes/thongKeRoutes.js';
const app = express();
const originDuocPhep = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    // Cho phep frontend Vite chay o cac cong localhost khi phat trien.
    if (!origin || origin === originDuocPhep || /^http:\/\/localhost:\d+$/.test(origin) || /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)) return callback(null, true);
    return callback(new Error('Nguồn truy cập không được phép bởi CORS.'));
  },
}));
app.use(express.json()); app.use(morgan('dev'));
app.get('/api/health', (req, res) => res.json({ thanhCong: true, thongBao: 'SmartMeal API đang hoạt động.' })); app.use('/api/auth', authRoutes); app.use('/api/mon-an', monAnRoutes); app.use('/api/don-dat', donDatRoutes); app.use('/api/du-bao', duBaoRoutes); app.use('/api/thong-ke', thongKeRoutes); app.use((req, res) => res.status(404).json({ thanhCong: false, thongBao: 'Không tìm thấy API.' })); app.use(xuLyLoi);
ketNoiDB().then(() => app.listen(process.env.PORT || 5000, () => console.log(`SmartMeal API chạy tại cổng ${process.env.PORT || 5000}`)));
