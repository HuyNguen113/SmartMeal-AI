// Model Mon An - Quan ly thuc don cua can tin
import mongoose from 'mongoose';

const monAnSchema = new mongoose.Schema(
  {
    // Ten mon an
    tenMon: {
      type: String,
      required: [true, 'Tên món ăn là bắt buộc'],
      trim: true,
    },
    // Mo ta chi tiet mon an
    moTa: {
      type: String,
      trim: true,
    },
    // Gia ban (VND)
    gia: {
      type: Number,
      required: [true, 'Giá là bắt buộc'],
      min: [0, 'Giá không được âm'],
    },
    // Danh muc phan loai mon an
    danhMuc: {
      type: String,
      enum: ['com', 'pho', 'bun', 'mi', 'nuoc', 'trang_mieng', 'khac'],
      default: 'khac',
    },
    // Duong dan hinh anh mon an
    hinhAnh: {
      type: String,
      default: '/images/default-food.jpg',
    },
    // Trang thai con phuc vu hay khong
    conPhucVu: {
      type: Boolean,
      default: true,
    },
    // Thoi gian chuan bi (phut)
    thoiGianChuanBi: {
      type: Number,
      default: 15,
    },
    // Cac tag mo ta (VD: cay, chay, healthy...)
    tags: {
      type: [String],
      default: [],
    },
    // Diem danh gia trung binh
    danhGiaTB: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    // Tong so luong danh gia
    soLuongDanhGia: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const MonAn = mongoose.model('MonAn', monAnSchema);

export default MonAn;
