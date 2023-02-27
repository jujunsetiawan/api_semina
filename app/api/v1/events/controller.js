const { createEvents, deleteEvents, getAllEvents, getOneEvents, updateEvents } = require('../../../service/mongoose/events');
const { StatusCodes } = require('http-status-codes');
  
const create = async (req, res, next) => {
  try {
    const result = await createEvents(req);
    res.status(StatusCodes.CREATED).json({ status: 'success', data: result });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllEvents(req);
    res.status(StatusCodes.OK).json({ status: 'success', data: result });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneEvents(req);
    res.status(StatusCodes.OK).json({ status: 'success', data: result });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateEvents(req);
    res.status(StatusCodes.OK).json({ status: 'success', data: result });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await deleteEvents(req);
    res.status(StatusCodes.OK).json({ status: 'success', message: 'talets berhasil dihapus' });
  } catch (err) {
    next(err);
  }
};

module.exports = { index, find, update, destroy, create }