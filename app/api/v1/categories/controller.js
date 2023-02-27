const { createCategories, deleteCategories, getAllCategories, getOneCategories, updateCategories } = require('../../../service/mongoose/categories')
const { StatusCodes } = require('http-status-codes')

const create = async (req, res, next) => {
    try {
      const result = await createCategories(req)
      res.status(StatusCodes.CREATED).json({ status: 'success', data: result });
    } catch (err) {
      next(err);
    }
};

const index = async (req, res, next) => {
    try {
      const result = await getAllCategories(req)
      res.status(StatusCodes.OK).json({ status: 'success', data: result });
    } catch (err) {
      next(err);
    }
  };

const find = async (req, res, next) => {
    try {
      const result = await getOneCategories(req)
      res.status(StatusCodes.OK).json({ status: 'success', data: result });
    } catch (err) {
      next(err);
    }
  };

const update = async (req, res, next) => {
    try {
      const result = await updateCategories(req)
      res.status(StatusCodes.OK).json({ status: 'success', data: result });
    } catch (err) {
      next(err);
    }
  };

  const destroy = async (req, res, next) => {
    try {
      await deleteCategories(req)
      res.status(200).json({ status: 'success', message: 'kategori berhasil dihapus' });
    } catch (err) {
      next(err);
    }
  };

module.exports = { create, index, find, update, destroy }