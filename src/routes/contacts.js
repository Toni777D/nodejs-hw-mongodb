import {Router} from "express";
import * as contactServices from '../services/contact.js';

const contactsRouter = Router();

contactsRouter.get("/", async (req, res) => {
    const data = await contactServices.getAllContacts();

    res.json({
        status: 200,
        message: "Successfully found contacts!",
        data,
    });
});

contactsRouter.get("/:id", async(req, res) => {
   const {id} = req.params;
   const data = await contactServices.getContactById(id);

   if(!data){
   return res.status(404).json({
        message: "Contact not found",
    });
   };

    res.json({
        status: 200,
        message:`Successfully found contact with id {id}`,
        data,
    });

});

export default contactsRouter;
