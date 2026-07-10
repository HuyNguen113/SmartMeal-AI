// Model Nguoi Dung - Quan ly thong tin tai khoan nguoi dung
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const nguoiDungSchema = new mongoose.Schema(
  {
    // Ho va ten nguoi dung
    hoTen: {
      type: String,
      required: [true, 'Họ tên là bắt buộc'],
      trim: true,
    },
    // Dia chi email (duy nhat)
    email: {
      type: String,
      required: [true, 'Email là bắt buộc'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    // Mat khau (se duoc hash truoc khi luu)
    matKhau: {
      type: String,
      required: [true, 'Mật khẩu là bắt buộc'],
      minlength: [6, 'Mật khẩu phải có ít nhất 6 ký tự'],
      select: false, // Khong tra ve mat khau khi query
    },
    // Vai tro nguoi dung trong he thong
    vaiTro: {
      type: String,
      enum: ['sinh_vien', 'nhan_vien', 'quan_tri'],
      default: 'sinh_vien',
    },
    // Ma sinh vien (neu la sinh vien)
    maSinhVien: {
      type: String,
      trim: true,
    },
    // So dien thoai lien he
    soDienThoai: {
      type: String,
      trim: true,
    },
    // Trang thai tai khoan (true = hoat dong)
    trangThai: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hook truoc khi luu: Hash mat khau neu thay doi
nguoiDungSchema.pre('save', async function (next) {
  // Chi hash khi mat khau thay doi hoac moi tao
  if (!this.isModified('matKhau')) return next();

  const salt = await bcrypt.genSalt(10);
  this.matKhau = await bcrypt.hash(this.matKhau, salt);
  next();
});

// Method so sanh mat khau khi dang nhap
nguoiDungSchema.methods.soSanhMatKhau = async function (matKhauNhap) {
  return await bcrypt.compare(matKhauNhap, this.matKhau);
};

const NguoiDung = mongoose.model('NguoiDung', nguoiDungSchema);

export default NguoiDung;
