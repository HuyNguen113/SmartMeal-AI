import 'dotenv/config';
import mongoose from 'mongoose';
import ketNoiDB from './src/config/db.js';
import NguoiDung from './src/models/NguoiDung.js';
import MonAn from './src/models/MonAn.js';
import DuBao from './src/models/DuBao.js';

const monAn = [
  { tenMon: 'Cơm gà sốt teriyaki', moTa: 'Gà áp chảo, rau củ theo mùa và cơm thơm.', gia: 32000, danhMuc: 'com', tags: ['Bán chạy'], danhGiaTB: 4.9, hinhAnh: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80' },
  { tenMon: 'Bún bò Huế đặc biệt', moTa: 'Nước dùng đậm vị, giò heo và chả cua.', gia: 35000, danhMuc: 'bun', tags: ['Đậm vị'], danhGiaTB: 4.8, hinhAnh: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=700&q=80' },
  { tenMon: 'Cơm chay rau củ', moTa: 'Đậu hũ, nấm và rau củ tươi trong ngày.', gia: 28000, danhMuc: 'com', tags: ['Chay'], danhGiaTB: 4.7, hinhAnh: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80' },
  { tenMon: 'Phở bò tái lăn', moTa: 'Bánh phở mềm, bò tái và nước dùng hầm xương.', gia: 38000, danhMuc: 'pho', tags: ['Yêu thích'], danhGiaTB: 4.9, hinhAnh: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=700&q=80' },
];
const ngay = new Date(); ngay.setHours(12, 0, 0, 0);
const run = async () => { await ketNoiDB(); await Promise.all([NguoiDung.deleteMany({}), MonAn.deleteMany({}), DuBao.deleteMany({})]); await NguoiDung.create([{ hoTen: 'Quản trị SmartMeal', email: 'admin@smartmeal.vn', matKhau: '123456', vaiTro: 'quan_tri' }, { hoTen: 'Nhân viên căn tin', email: 'staff@smartmeal.vn', matKhau: '123456', vaiTro: 'nhan_vien' }, { hoTen: 'Nguyễn Minh Anh', email: 'student@smartmeal.vn', matKhau: '123456', vaiTro: 'sinh_vien', maSinhVien: 'SV20240123' }]); await MonAn.insertMany(monAn); await DuBao.insertMany([{ ngay, tenMon: 'Cơm gà sốt teriyaki', duDoan: 128, thucTe: 122, saiSo: 4.9, duLieuDauVao: { thu: 'Thứ Sáu', thoiTiet: 'Nắng nhẹ', coThi: false, soDonHomQua: 315, soDonTuanTruoc: 305 } }, { ngay, tenMon: 'Bún bò Huế đặc biệt', duDoan: 96, thucTe: 93, saiSo: 3.2, duLieuDauVao: { thu: 'Thứ Sáu', thoiTiet: 'Nắng nhẹ', coThi: false, soDonHomQua: 315, soDonTuanTruoc: 305 } }, { ngay, tenMon: 'Cơm chay rau củ', duDoan: 106, thucTe: 101, saiSo: 4.7, duLieuDauVao: { thu: 'Thứ Sáu', thoiTiet: 'Nắng nhẹ', coThi: false, soDonHomQua: 315, soDonTuanTruoc: 305 } }]); console.log('Đã tạo dữ liệu mẫu.'); await mongoose.disconnect(); };
run().catch((error) => { console.error(error); process.exit(1); });
