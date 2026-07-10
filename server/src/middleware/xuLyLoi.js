// Middleware xu ly loi chung - Tra ve JSON voi thong bao tieng Viet

const xuLyLoi = (err, req, res, next) => {
  console.error('❌ Lỗi:', err.message);

  let statusCode = err.statusCode || 500;
  let thongBao = err.message || 'Đã xảy ra lỗi từ server.';

  // Loi validation cua Mongoose
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const cacLoi = Object.values(err.errors).map((e) => e.message);
    thongBao = cacLoi.join('. ');
  }

  // Loi duplicate key (vi du: email trung)
  if (err.code === 11000) {
    statusCode = 400;
    const truong = Object.keys(err.keyValue).join(', ');
    thongBao = `Giá trị trường ${truong} đã tồn tại. Vui lòng sử dụng giá trị khác.`;
  }

  // Loi ObjectId khong hop le
  if (err.name === 'CastError') {
    statusCode = 400;
    thongBao = 'ID không hợp lệ.';
  }

  res.status(statusCode).json({
    thanhCong: false,
    thongBao,
    ...(process.env.NODE_ENV === 'development' && { chiTietLoi: err.stack }),
  });
};

export default xuLyLoi;
