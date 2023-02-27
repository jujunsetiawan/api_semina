const { createTalents, deleteTalents, getAllTalents, getOneTalents, updateTalents } = require('../../../service/mongoose/talents');
const { StatusCodes } = require('http-status-codes');
  
const create = async (req, res, next) => {
  try {
    const result = await createTalents(req);
    res.status(StatusCodes.CREATED).json({ status: 'success', data: result });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllTalents(req);
    res.status(StatusCodes.OK).json({ status: 'success', data: result });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneTalents(req);
    res.status(StatusCodes.OK).json({ status: 'success', data: result });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateTalents(req);
    res.status(StatusCodes.OK).json({ status: 'success', data: result });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await deleteTalents(req);
    res.status(StatusCodes.OK).json({ status: 'success', message: 'talets berhasil dihapus' });
  } catch (err) {
    next(err);
  }
};

module.exports = { index, find, update, destroy, create }