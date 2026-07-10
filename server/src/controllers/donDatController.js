import crypto from 'crypto';
import DonDat from '../models/DonDat.js';
import MonAn from '../models/MonAn.js';

export const taoDon = async (req, res, next) => {
  try {
    const { cacMon, ngayNhan, gioNhan, ghiChu, thongTinNhan } = req.body;
    if (!Array.isArray(cacMon) || !cacMon.length) return res.status(400).json({ thanhCong: false, thongBao: 'Đơn hàng chưa có món ăn.' });
    const fields = ['hoTen', 'maSinhVien', 'soDienThoai', 'email', 'lop'];
    if (!thongTinNhan || fields.some((field) => !String(thongTinNhan[field] || '').trim())) {
      return res.status(400).json({ thanhCong: false, thongBao: 'Vui lòng điền đầy đủ thông tin nhận món.' });
    }
    const ids = cacMon.map((m) => m.monAn);
    const dsMon = await MonAn.find({ _id: { $in: ids }, conPhucVu: true });
    if (dsMon.length !== ids.length) return res.status(400).json({ thanhCong: false, thongBao: 'Một số món không còn phục vụ.' });
    const monTheoId = new Map(dsMon.map((m) => [m._id.toString(), m]));
    const chiTiet = cacMon.map((m) => { const mon = monTheoId.get(m.monAn); const soLuong = Math.max(1, Number(m.soLuong) || 1); return { monAn: mon._id, tenMon: mon.tenMon, gia: mon.gia, soLuong, khauPhan: m.khauPhan || 'vua' }; });
    const tongTien = chiTiet.reduce((sum, m) => sum + m.gia * m.soLuong, 0);
    const donDat = await DonDat.create({ nguoiDat: req.nguoiDung._id, cacMon: chiTiet, tongTien, ngayNhan, gioNhan, ghiChu, thongTinNhan, maQR: crypto.randomUUID() });
    res.status(201).json({ thanhCong: true, thongBao: 'Đặt món thành công.', donDat });
  } catch (error) { next(error); }
};
export const layDon = async (req, res, next) => { try { const query = req.nguoiDung.vaiTro === 'sinh_vien' ? { nguoiDat: req.nguoiDung._id } : {}; const donDat = await DonDat.find(query).populate('nguoiDat', 'hoTen email maSinhVien').sort({ createdAt: -1 }); res.json({ thanhCong: true, donDat }); } catch (error) { next(error); } };
export const layChiTietDon = async (req, res, next) => { try { const donDat = await DonDat.findById(req.params.id).populate('nguoiDat', 'hoTen email maSinhVien'); if (!donDat) return res.status(404).json({ thanhCong: false, thongBao: 'Không tìm thấy đơn.' }); if (req.nguoiDung.vaiTro === 'sinh_vien' && donDat.nguoiDat._id.toString() !== req.nguoiDung._id.toString()) return res.status(403).json({ thanhCong: false, thongBao: 'Không có quyền xem đơn này.' }); res.json({ thanhCong: true, donDat }); } catch (error) { next(error); } };
export const capNhatTrangThai = async (req, res, next) => { try { const donDat = await DonDat.findByIdAndUpdate(req.params.id, { trangThai: req.body.trangThai }, { new: true, runValidators: true }); if (!donDat) return res.status(404).json({ thanhCong: false, thongBao: 'Không tìm thấy đơn.' }); res.json({ thanhCong: true, donDat }); } catch (error) { next(error); } };
export const huyDon = async (req, res, next) => { try { const donDat = await DonDat.findOne({ _id: req.params.id, nguoiDat: req.nguoiDung._id }); if (!donDat) return res.status(404).json({ thanhCong: false, thongBao: 'Không tìm thấy đơn.' }); if (!['cho_xac_nhan', 'da_xac_nhan'].includes(donDat.trangThai)) return res.status(400).json({ thanhCong: false, thongBao: 'Đơn này không thể hủy.' }); donDat.trangThai = 'da_huy'; await donDat.save(); res.json({ thanhCong: true, donDat }); } catch (error) { next(error); } };
