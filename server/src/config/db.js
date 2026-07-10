// Ket noi co so du lieu MongoDB
import mongoose from 'mongoose';

const ketNoiDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ Đã kết nối MongoDB thành công: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Lỗi kết nối MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default ketNoiDB;
