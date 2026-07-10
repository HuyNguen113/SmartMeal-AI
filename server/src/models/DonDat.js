// Model Don Dat - Quan ly don dat suat an
import mongoose from 'mongoose';

const donDatSchema = new mongoose.Schema(
  {
    // Ma don tu dong (VD: ORD-20260710-001)
    maDon: {
      type: String,
      unique: true,
    },
    // Nguoi dat don (tham chieu den NguoiDung)
    nguoiDat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NguoiDung',
      required: [true, 'Người đặt là bắt buộc'],
    },
    // Danh sach cac mon trong don
    cacMon: [
      {
        // Tham chieu den mon an
        monAn: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'MonAn',
        },
        // Snapshot ten mon tai thoi diem dat
        tenMon: {
          type: String,
        },
        // Snapshot gia tai thoi diem dat
        gia: {
          type: Number,
        },
        // So luong
        soLuong: {
          type: Number,
          default: 1,
          min: [1, 'Số lượng phải ít nhất là 1'],
        },
        // Khau phan: nho / vua / lon
        khauPhan: {
          type: String,
          enum: ['nho', 'vua', 'lon'],
          default: 'vua',
        },
      },
    ],
    // Tong tien cua don
    tongTien: {
      type: Number,
      required: [true, 'Tổng tiền là bắt buộc'],
      min: [0, 'Tổng tiền không được âm'],
    },
    // Trang thai don hang
    trangThai: {
      type: String,
      enum: [
        'cho_xac_nhan',
        'da_xac_nhan',
        'dang_nau',
        'san_sang',
        'hoan_tat',
        'da_huy',
      ],
      default: 'cho_xac_nhan',
    },
    // Thong tin nguoi nhan duoc luu tai thoi diem dat mon de doi chieu tai quay
    thongTinNhan: {
      hoTen: { type: String, required: [true, 'Họ tên người nhận là bắt buộc'], trim: true },
      maSinhVien: { type: String, required: [true, 'Mã số sinh viên là bắt buộc'], trim: true },
      soDienThoai: { type: String, required: [true, 'Số điện thoại là bắt buộc'], trim: true },
      email: { type: String, required: [true, 'Email là bắt buộc'], trim: true, lowercase: true },
      lop: { type: String, required: [true, 'Lớp là bắt buộc'], trim: true },
    },
    // Ngay nhan don
    ngayNhan: {
      type: Date,
    },
    // Gio nhan mong muon (VD: '11:30')
    gioNhan: {
      type: String,
    },
    // Ma QR de xac nhan nhan don
    maQR: {
      type: String,
    },
    // Ghi chu them cua nguoi dat
    ghiChu: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hook truoc khi luu: Tu dong tao ma don neu chua co
donDatSchema.pre('save', async function (next) {
  if (!this.maDon) {
    const ngay = new Date();
    const nam = ngay.getFullYear().toString();
    const thang = (ngay.getMonth() + 1).toString().padStart(2, '0');
    const ngayTrong = ngay.getDate().toString().padStart(2, '0');
    const chuoiNgay = `${nam}${thang}${ngayTrong}`;

    // Dem so don trong ngay de tao so thu tu
    const soDonTrongNgay = await mongoose.model('DonDat').countDocuments({
      maDon: { $regex: `^ORD-${chuoiNgay}` },
    });

    const soThuTu = (soDonTrongNgay + 1).toString().padStart(3, '0');
    this.maDon = `ORD-${chuoiNgay}-${soThuTu}`;
  }

  // Tu dong gan ma QR = ma don
  if (!this.maQR) {
    this.maQR = this.maDon;
  }

  next();
});

const DonDat = mongoose.model('DonDat', donDatSchema);

export default DonDat;
