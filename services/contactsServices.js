import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";

import Movie from "../models/Contact.js";

export const listContacts = () => Movie.find();

export const getContactById = (contactId) => Movie.findById(contactId);

export const updateContactById = (contactId, update, options) =>
  Movie.findByIdAndUpdate(contactId, update, options);

export const removeContact = (contactId) => Movie.findByIdAndDelete(contactId);

export const addContact = (data) => Movie.create(data);

export const updateStatusContact = (contactId, update, options) =>
  Movie.findByIdAndUpdate(contactId, update, options);
