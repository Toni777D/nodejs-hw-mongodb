import {Router} from "express";
import { addContactController, deleteContactController, getAllContactsController, getContactByIdController, patchContactController } from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";

const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(getAllContactsController));

contactsRouter.get("/:id",ctrlWrapper(getContactByIdController));

contactsRouter.post("/", ctrlWrapper(addContactController));

contactsRouter.patch("/:id", ctrlWrapper(patchContactController));

contactsRouter.delete("/:id", ctrlWrapper(deleteContactController));

export default contactsRouter;
