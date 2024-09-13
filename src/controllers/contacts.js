import * as contactServices from '../services/contact.js';
import createHttpError from 'http-errors';
// import { updateContact } from '../services/contact.js';

export const getAllContactsController = async (req, res) => {

    const data = await contactServices.getAllContacts();

    res.json({
        status: 200,
        message: "Successfully found contacts!",
        data,
    });
};

export const getContactByIdController =  async(req, res) => {

        const {id} = req.params;
        const data = await contactServices.getContactById(id);

     if(!data){
        throw createHttpError(404, "Contact not found");
        };

        res.json({
             status: 200,
             message:`Successfully found contact with id {id}`,
            data,
        });
 };
 export const addContactController = async(req, res) => {
    const data = await contactServices.creatContact(req.body);
    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    })
 }
 export const patchContactController = async(req, res, next) => {
        const {id} = req.params;
        const result = await contactServices.updateContact({_id: id}, req.body);

        if(!result){
            next(createHttpError(404, "Contact not found"));
            return;
        }

        res.json({
            status: 200,
            message: "Successfully patched a contact!",
            data: result.data,
        });
 };

 export const deleteContactController = async(req, res, next) => {
    const {id} = req.params;
    const data = await contactServices.deleteContact({_id: id});

    if(!data){
        next(createHttpError(404, "Contact not found"));
        return;
    }

    res.status(204).send();
 }
