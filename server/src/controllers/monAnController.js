import MonAn from '../models/MonAn.js';

export const layDanhSach = async (req, res, next) => {
  try {
    const { danhMuc, timKiem } = req.query;
    const query = {};
    if (danhMuc && danhMuc !== 'tat_ca') query.danhMuc = danhMuc;
    if (timKiem) query.tenMon = { $regex: timKiem, $options: 'i' };
    const monAn = await MonAn.find(query).sort({ createdAt: -1 });
    res.json({ thanhCong: true, monAn });
  } catch (error) { next(error); }
};
export const layChiTiet = async (req, res, next) => { try { const monAn = await MonAn.findById(req.params.id); if (!monAn) return res.status(404).json({ thanhCong: false, thongBao: 'Không tìm thấy món ăn.' }); res.json({ thanhCong: true, monAn }); } catch (error) { next(error); } };
export const taoMon = async (req, res, next) => { try { const monAn = await MonAn.create(req.body); res.status(201).json({ thanhCong: true, monAn }); } catch (error) { next(error); } };
export const capNhatMon = async (req, res, next) => { try { const monAn = await MonAn.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!monAn) return res.status(404).json({ thanhCong: false, thongBao: 'Không tìm thấy món ăn.' }); res.json({ thanhCong: true, monAn }); } catch (error) { next(error); } };
export const xoaMon = async (req, res, next) => { try { const monAn = await MonAn.findByIdAndDelete(req.params.id); if (!monAn) return res.status(404).json({ thanhCong: false, thongBao: 'Không tìm thấy món ăn.' }); res.json({ thanhCong: true, thongBao: 'Đã xóa món ăn.' }); } catch (error) { next(error); } };
