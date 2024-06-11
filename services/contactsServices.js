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

// const contactsPath = path.join(process.cwd(), "db", "contacts.json");

// export async function removeContact(contactId) {
//   const allContacts = await listContacts();

//   const findContactIndex = allContacts.findIndex(
//     (contact) => contact.id === contactId
//   );

//   if (findContactIndex === -1) {
//     return null;
//   }

//   const removedContact = allContacts[findContactIndex];

//   allContacts.splice(findContactIndex, 1);

//   fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

//   return removedContact;
// }

// export async function addContact(data) {
//   const allContacts = await listContacts();
//   const id = uuidv4();

//   allContacts.push({ id, ...data });

//   fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

//   return allContacts[allContacts.length - 1];
// }

// export async function updateContactById(id, data) {
//   const allContacts = await listContacts();
//   const index = allContacts.findIndex((item) => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   allContacts[index] = { ...allContacts[index], ...data };
//   fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

//   return allContacts[index];
// }

// export async function listContacts() {
//   try {
//     const data = await fs.readFile(contactsPath);
//     return JSON.parse(data);
//   } catch (error) {
//     throw new Error("Unable to read contacts file.");
//   }
// }

// export async function getContactById(contactId) {
//   const allContacts = await listContacts();

//   const contact = allContacts.find((contact) => contact.id === contactId);

//   return contact || null;
// }
