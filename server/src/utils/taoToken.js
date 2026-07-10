// Tien ich tao JWT token
import jwt from 'jsonwebtoken';

// Tao access token - het han sau 15 phut
export const taoAccessToken = (nguoiDung) => {
  return jwt.sign(
    {
      id: nguoiDung._id,
      email: nguoiDung.email,
      vaiTro: nguoiDung.vaiTro,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '15m' }
  );
};

// Tao refresh token - het han sau 7 ngay
export const taoRefreshToken = (nguoiDung) => {
  return jwt.sign(
    {
      id: nguoiDung._id,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d' }
  );
};
