const Categories = require('../../api/v1/categories/model')
const { NotFoundError, BadRequestError } = require('../../errors')

const createCategories = async(req) => {
    const { name } = req.body;
    
    const check = await Categories.findOne({ name })
    if(check) throw new BadRequestError('nama kategori sudah terdaftar')

    const result = await Categories.create({ name });
    return result
}

const getAllCategories = async(req) => {
    const result = await Categories.find()
    return result
}

const getOneCategories = async(req) => {
    const { id } = req.params
    
    const result = await Categories.findOne({ _id: id })
    if(!result) throw new NotFoundError(`tidak ada kategori dengan id ${id}`)

    return result
}

const updateCategories = async(req) => {
    const { id } = req.params
    const { name } = req.body

    const check = await Categories.findOne({ name, _id: { $ne: id }})
    if(check) throw new BadRequestError('nama kategori sudah terdaftar')

    const result = await Categories.findOneAndUpdate({ _id: id }, { name }, { new: true, runValidators: true })
    if(!result) throw new NotFoundError(`tidak ada kategori dengan id ${id}`)

    return result
}

const deleteCategories = async(req) => {
    const { id } = req.params

    const result = await Categories.findByIdAndRemove(id)
    if(!result) throw new NotFoundError(`tidak ada kategori dengan id ${id}`)

    return result
}

const chekingCategories = async(id) => {
    const result = await Categories.findOne({ _id: id })
    if(!result) throw new NotFoundError(`tidak ada kategori dengan id ${id}`)
    return result
}

module.exports = { createCategories, getAllCategories, getOneCategories, updateCategories, deleteCategories, chekingCategories }