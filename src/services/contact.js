import { SORT_ORDER } from '../constans/index.js';
import ContactCollection from '../db/models/Contact.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
    perPage,
    page,
    sortBy = "name",
    sortOrder = SORT_ORDER[0],
    userId,
}) => {
    const skip = (page - 1) * perPage;
    const limit = perPage;
    const contactQuery = ContactCollection.find({userId});

    const data = await contactQuery.skip(skip).limit(limit).sort({[sortBy] : sortOrder});
    const count = await ContactCollection.find().merge(contactQuery).countDocuments();
    const paginationData = calculatePaginationData({count, perPage, page});

    return {
        data,
        page,
        perPage,
        totalItems: count,
        ...paginationData,
    };
}

export const getContact = filter => ContactCollection.findOne(filter);

// export const getContact = filter => ContactCollection.find(filter);
export const createContact = payload => ContactCollection.create(payload);

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
