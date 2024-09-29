import {Router} from "express";
import { addContactController, deleteContactController, getAllContactsController, getContactByIdController, patchContactController } from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";
import { contactAddSchema, contactPatchSchema } from "../validation/contacts.js";
import isValidId from "../middlewares/isValdId.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", ctrlWrapper(getAllContactsController));

contactsRouter.get("/:id",isValidId, ctrlWrapper(getContactByIdController));

// upload.filds([{name: "poster", maxCount: 1}]) для декілька полів
// upload.single("poster", 8);  для декількох(8)
contactsRouter.post("/", upload.single("photo"), validateBody(contactAddSchema), ctrlWrapper(addContactController));

contactsRouter.patch("/:id", upload.single("photo"), isValidId, validateBody(contactPatchSchema), ctrlWrapper(patchContactController));

contactsRouter.delete("/:id", isValidId, ctrlWrapper(deleteContactController));

export default contactsRouter;
