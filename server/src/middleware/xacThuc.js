// Middleware xac thuc - Kiem tra JWT token tu header Authorization
import jwt from 'jsonwebtoken';
import NguoiDung from '../models/NguoiDung.js';

const xacThuc = async (req, res, next) => {
  try {
    let token;

    // Kiem tra header Authorization co chua Bearer token khong
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        thanhCong: false,
        thongBao: 'Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.',
      });
    }

    // Giai ma token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Tim nguoi dung tuong ung
    const nguoiDung = await NguoiDung.findById(decoded.id);

    if (!nguoiDung) {
      return res.status(401).json({
        thanhCong: false,
        thongBao: 'Người dùng không tồn tại hoặc đã bị xóa.',
      });
    }

    if (!nguoiDung.trangThai) {
      return res.status(401).json({
        thanhCong: false,
        thongBao: 'Tài khoản đã bị vô hiệu hóa.',
      });
    }

    // Gan thong tin nguoi dung vao request
    req.nguoiDung = nguoiDung;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        thanhCong: false,
        thongBao: 'Token không hợp lệ.',
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        thanhCong: false,
        thongBao: 'Token đã hết hạn. Vui lòng đăng nhập lại.',
      });
    }
    return res.status(500).json({
      thanhCong: false,
      thongBao: 'Lỗi xác thực.',
    });
  }
};

export default xacThuc;
