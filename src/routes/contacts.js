import {Router} from "express";
import { getAllContactsController, getContactByIdController } from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";

const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(getAllContactsController));

contactsRouter.get("/:id",ctrlWrapper(getContactByIdController));

export default contactsRouter;
