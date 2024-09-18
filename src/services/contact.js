import { SORT_ORDER } from '../constans/index.js';
import ContactCollection from '../db/models/Contact.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
    perPage,
    page,
    sortBy = "name",
    sortOrder = SORT_ORDER[0],
}) => {
    const skip = (page - 1) * perPage;
    const limit = perPage;
    const data = await ContactCollection.find().skip(skip).limit(limit).sort({[sortBy] : sortOrder});
    const count = await ContactCollection.find().countDocuments();
    const paginationData = calculatePaginationData({count, perPage, page});
    return {
        data,
        page,
        perPage,
        totalItems: count,
        ...paginationData,
    };
}

export const getContactById = id => ContactCollection.findById(id);

export const creatContact = payload => ContactCollection.create(payload);

export const updateContact = async(filter, data, options = {}) =>{
    const rawResult = await ContactCollection.findOneAndUpdate(filter, data, {
        new: true,
        includeResultMetadata: true,
        ...options,
    });

    if (!rawResult || !rawResult.value) return null;
    return {
        data: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted)
    };
};


export const deleteContact = filter => ContactCollection.findOneAndDelete(filter);
