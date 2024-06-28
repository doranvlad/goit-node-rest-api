import fs from "fs/promises";
import path from "path";

import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContactById,
  updateStatusContact,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const avatarsDir = path.resolve("public", "avatars");

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await listContacts();

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const result = await getContactById(req.params.id);

    if (!result) {
      throw HttpError(404, `Not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await removeContact(id);

    if (!result) {
      throw HttpError(404, `Not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { _id: owner } = req.user;
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarsDir, filename);
    await fs.rename(oldPath, newPath);
    const avatar = path.join("avatars", filename);

    // const result = await addContact(req.body);
    const result = await addContact({
      ...req.body,
      avatar,
      owner,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(404, `Not found`);
    }

    const { id } = req.params;
    const result = await updateContactById(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const addFavorite = async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(404, `Not found`);
    }

    const { id } = req.params;

    const result = await updateStatusContact(
      id,
      { favorite: true },
      { new: true, runValidators: true }
    );

    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  addFavorite,
};
