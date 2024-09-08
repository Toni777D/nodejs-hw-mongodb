import * as contactServices from '../services/contact.js';
import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {

    const data = await contactServices.getAllContacts();

    res.json({
        status: 200,
        message: "Successfully found contacts!",
        data,
    });
};

export const getContactByIdController =  async(req, res, next) => {

        const {id} = req.params;
        const data = await contactServices.getContactById(id);

     if(!data){
        throw createHttpError(404, 'Contact not found')
        // return res.status(404).json({
        //    message: "Contact not found",
        // });
        };

        res.json({
             status: 200,
             message:`Successfully found contact with id {id}`,
            data,
        });
 };
