import NguoiDung from '../models/NguoiDung.js';
import { taoAccessToken, taoRefreshToken } from '../utils/taoToken.js';

const phanHoiNguoiDung = (nguoiDung) => ({
  id: nguoiDung._id,
  hoTen: nguoiDung.hoTen,
  email: nguoiDung.email,
  vaiTro: nguoiDung.vaiTro,
  maSinhVien: nguoiDung.maSinhVien,
});

export const dangKy = async (req, res, next) => {
  try {
    const { hoTen, email, matKhau, maSinhVien, soDienThoai } = req.body;
    if (!hoTen || !email || !matKhau) return res.status(400).json({ thanhCong: false, thongBao: 'Vui lòng điền đầy đủ họ tên, email và mật khẩu.' });
    const tonTai = await NguoiDung.findOne({ email });
    if (tonTai) return res.status(400).json({ thanhCong: false, thongBao: 'Email này đã được sử dụng.' });
    const nguoiDung = await NguoiDung.create({ hoTen, email, matKhau, maSinhVien, soDienThoai });
    res.status(201).json({ thanhCong: true, thongBao: 'Tạo tài khoản thành công.', nguoiDung: phanHoiNguoiDung(nguoiDung), token: taoAccessToken(nguoiDung), refreshToken: taoRefreshToken(nguoiDung) });
  } catch (error) { next(error); }
};

export const dangNhap = async (req, res, next) => {
  try {
    const { email, matKhau } = req.body;
    const nguoiDung = await NguoiDung.findOne({ email }).select('+matKhau');
    if (!nguoiDung || !(await nguoiDung.soSanhMatKhau(matKhau))) return res.status(401).json({ thanhCong: false, thongBao: 'Email hoặc mật khẩu không chính xác.' });
    if (!nguoiDung.trangThai) return res.status(401).json({ thanhCong: false, thongBao: 'Tài khoản đã bị vô hiệu hóa.' });
    res.json({ thanhCong: true, thongBao: `Chào mừng ${nguoiDung.hoTen}!`, nguoiDung: phanHoiNguoiDung(nguoiDung), token: taoAccessToken(nguoiDung), refreshToken: taoRefreshToken(nguoiDung) });
  } catch (error) { next(error); }
};

export const thongTin = (req, res) => res.json({ thanhCong: true, nguoiDung: phanHoiNguoiDung(req.nguoiDung) });
