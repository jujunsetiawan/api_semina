const Categories = require('./model');

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await Categories.create({ name });
    res.status(201).json({ status: 'success', data: result });
  } catch (err) {
    next(err);
  }
};

const index = async(req, res, next) => {
    try {
        const result = await Categories.find()
        res.status(200).json({ status: 'success', data: result })
    } catch (error) {
        next(error)
    }
}

const find = async(req, res, next) => {
    try {
        const { id } = req.params

        const result = await Categories.findOne({ _id: id })
        if(!result) return res.status(404).json({ status: 'error', message: `tidak ada kategori dengan id ${id}` })

        res.status(200).json({ status: 'success', data: result })
    } catch (error) {
        next(error)
    }
}

const update = async(req, res, next) => {
    try {
        const { id } = req.params
        const { name } = req.body

        const result = await Categories.findOneAndUpdate({ _id: id }, { name }, { new: true, runValidators: true })
        if(!result) return res.status(404).json({ status: 'error', message: `tidak ada kategori dengan id ${id}` })

        res.status(200).json({ status: 'success', data: result })
    } catch (error) {
        next(error)
    }
}

const destroy = async(req, res, next) => {
    try {
        const { id } = req.params

        const result = await Categories.findByIdAndRemove(id)
        if(!result) return res.status(404).json({ status: 'error', message: `tidak ada kategori dengan id ${id}` })

        res.status(200).json({ status: 'success', message: 'kategori berhasil di hapus' })
    } catch (error) {
        next(error)
    }
}

module.exports = { create, index, find, update, destroy }