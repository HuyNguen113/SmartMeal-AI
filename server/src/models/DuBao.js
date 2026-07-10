// Model Du Bao - Luu tru du lieu du bao nhu cau suat an
import mongoose from 'mongoose';

const duBaoSchema = new mongoose.Schema(
  {
    // Ngay du bao
    ngay: {
      type: Date,
      required: [true, 'Ngày dự báo là bắt buộc'],
    },
    // Ten mon an du bao
    tenMon: {
      type: String,
      trim: true,
    },
    // So luong du doan
    duDoan: {
      type: Number,
    },
    // So luong thuc te (cap nhat sau)
    thucTe: {
      type: Number,
    },
    // Sai so giua du doan va thuc te
    saiSo: {
      type: Number,
    },
    // Du lieu dau vao cho model AI
    duLieuDauVao: {
      // Thu trong tuan
      thu: {
        type: String,
      },
      // Thoi tiet ngay do
      thoiTiet: {
        type: String,
      },
      // Co ky thi khong
      coThi: {
        type: Boolean,
      },
      // Su kien dac biet
      suKien: {
        type: String,
      },
      // So don hom qua
      soDonHomQua: {
        type: Number,
      },
      // So don tuan truoc (cung ngay)
      soDonTuanTruoc: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

const DuBao = mongoose.model('DuBao', duBaoSchema);

export default DuBao;
