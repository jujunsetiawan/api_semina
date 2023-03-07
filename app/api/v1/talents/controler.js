const { createTalent, deleteTalent, getAllTalent, getOneTalent, updateTalent } = require('../../../service/mongoose/talents');
const { StatusCodes } = require('http-status-codes');
  
const create = async (req, res, next) => {
  try {
    const result = await createTalent(req);
    res.status(StatusCodes.CREATED).json({ status: 'success', data: result });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllTalent(req);
    res.status(StatusCodes.OK).json({ status: 'success', data: result });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneTalent(req);
    res.status(StatusCodes.OK).json({ status: 'success', data: result });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateTalent(req);
    res.status(StatusCodes.OK).json({ status: 'success', data: result });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await deleteTalent(req);
    res.status(StatusCodes.OK).json({ status: 'success', message: 'talets berhasil dihapus' });
  } catch (err) {
    next(err);
  }
};

module.exports = { index, find, update, destroy, create }