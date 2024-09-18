import {Router} from "express";
import { addContactController, deleteContactController, getAllContactsController, getContactByIdController, patchContactController } from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";
import { contactAddSchema, contactPatchSchema } from "../validation/contacts.js";
import isValidId from "../middlewares/isValdId.js";

const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(getAllContactsController));

contactsRouter.get("/:id",isValidId, ctrlWrapper(getContactByIdController));

contactsRouter.post("/", validateBody(contactAddSchema), ctrlWrapper(addContactController));

contactsRouter.patch("/:id", isValidId, validateBody(contactPatchSchema), ctrlWrapper(patchContactController));

contactsRouter.delete("/:id", isValidId, ctrlWrapper(deleteContactController));

export default contactsRouter;
