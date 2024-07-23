import { getAllContacts, getContactById, createContact, deleteContact, updateContact } from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';




export const getContactsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const userId = req.user._id; 

    const contacts = await getAllContacts({
      userId,
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });

    res.json({
      status: 200,
      message: 'Contacts found successfully!',
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
};


export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id; 

    const contact = await getContactById({ contactId, userId });

    if (!contact) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }

    res.json({
      status: 200,
      message: `Contact successfully found id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};


export const createContactController = async (req, res, next) => {
  try {
    const { name, phoneNumber  } = req.body;


    if (!name || !phoneNumber) {
      next(createHttpError(400, 'Name and phone number are required'));
      return;
    }

    const userId = req.user._id; 

    const photo = req.file;

    let photoUrl;
    if (photo) {
      photoUrl = await saveFileToCloudinary(photo);
    }


    const newContact = await createContact({ userId,  ...req.body, photo: photoUrl   });

   


    res.status(201).json({
      status: 201,
      message: 'Contact successfully created!',
      data: newContact,
    });
  } catch (err) {
    next(err);
  }
};


export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id;

    const contact = await deleteContact({ contactId, userId });

    if (!contact) {
      next(createHttpError(404, 'Contact not found', { message: 'Contact not found' }));
      return;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};


export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id;

    const photo = req.file;

    let photoUrl;
    if (photo) {
      photoUrl = await saveFileToCloudinary(photo);
    }

    const result = await updateContact({ contactId, userId, payload: { ...req.body, photo: photoUrl } });

    if (!result) {
      next(createHttpError(404, 'Contact not found', { message: 'Contact not found' }));
      return;
    }

    res.json({
      status: 200,
      message: 'Contact successfully updated!!',
      data: result.contact,
    });
  } catch (err) {
    next(err);
  }
};