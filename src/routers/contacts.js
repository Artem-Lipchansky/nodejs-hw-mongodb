
import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

contactsRouter.post('/', upload.single('photo'), validateBody(createContactSchema), (req, res, next) => {
  if (req.body.userId) {
    delete req.body.userId;
  }
  next();
}, ctrlWrapper(createContactController));

contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

contactsRouter.patch('/:contactId', isValidId, upload.single('photo'), validateBody(updateContactSchema), (req, res, next) => {
  if (req.body.userId) {
    delete req.body.userId;
  }
  next();
}, ctrlWrapper(patchContactController));

export default contactsRouter;
