const { createEvent, deleteEvent, getAllEvents, getOneEvent, updateEvent, changeStatusEvent } = require('../../../service/mongoose/events');
const { StatusCodes } = require('http-status-codes');
  
const create = async (req, res, next) => {
  try {
    const result = await createEvent(req);
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
    const result = await getOneEvent(req);
    res.status(StatusCodes.OK).json({ status: 'success', data: result });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateEvent(req);
    res.status(StatusCodes.OK).json({ status: 'success', data: result });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await deleteEvent(req);
    res.status(StatusCodes.OK).json({ status: 'success', message: 'talets berhasil dihapus' });
  } catch (err) {
    next(err);
  }
};

const changeStatus = async(req, res, next) => {
  try {
      const result = await changeStatusEvent(req)
      res.status(StatusCodes.OK).json({ status: 'success', data: result })
  } catch (error) {
      next(error)
  }
}

module.exports = { index, find, update, destroy, create, changeStatus }