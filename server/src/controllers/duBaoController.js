import DuBao from '../models/DuBao.js';

export const homNay = async (req, res, next) => { try { const batDau = new Date(); batDau.setHours(0, 0, 0, 0); const ketThuc = new Date(batDau); ketThuc.setDate(ketThuc.getDate() + 1); const duBao = await DuBao.find({ ngay: { $gte: batDau, $lt: ketThuc } }); res.json({ thanhCong: true, duBao }); } catch (error) { next(error); } };
export const lichSu = async (req, res, next) => { try { const duBao = await DuBao.find().sort({ ngay: -1 }).limit(60); res.json({ thanhCong: true, duBao }); } catch (error) { next(error); } };
