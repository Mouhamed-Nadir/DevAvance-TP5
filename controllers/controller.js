
import Book from "../models/book.js";
import { bookSchema, bookResponseSchema, booksArrayResponseSchema, updateBookSchema  } from "../schemas/schema.js";

// Obtenir tous les livres
async function getAllBooks(req, reply) {
    try {
        const books = await Book.find({}, "title author description format"); // Sélectionne uniquement ces champs
        reply.send(books);
    } catch (error) {
        reply.code(500).send({ error: "Erreur lors de la récupération des livres" });
    }
}

// Obtenir un livre par ID
async function getBookById(req, reply) {
    try {
        const book = await Book.findById(req.params.id, "title author description format");
        if (!book) return reply.code(404).send({ error: "Livre non trouvé" });
        reply.send(book);
    } catch (error) {
        reply.code(500).send({ error: "Erreur lors de la récupération du livre" });
    }
}

// Ajouter un livre (Validation des données)
async function createBook(req, reply) {
    try {
        const book = new Book(req.body);
        await book.save();
        reply.code(201).send({
            title: book.title,
            author: book.author,
            description: book.description,
            format: book.format
        });
    } catch (error) {
        reply.code(400).send({ error: "Erreur lors de l'ajout du livre" });
    }
}

// Mettre à jour un livre
async function updateBook(req, reply) {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }  // Exécute les validateurs Mongoose
        );
        if (!updatedBook) return reply.code(404).send({ error: "Livre non trouvé" });

        reply.send({
            title: updatedBook.title,
            author: updatedBook.author,
            description: updatedBook.description,
            format: updatedBook.format
        });
    } catch (error) {
        reply.code(400).send({ error: "Erreur lors de la mise à jour du livre" });
    }
}

// Supprimer un livre
async function deleteBook(req, reply) {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return reply.code(404).send({ error: "Livre non trouvé" });
        reply.send({ message: "Livre supprimé avec succès" });
    } catch (error) {
        reply.code(500).send({ error: "Erreur lors de la suppression du livre" });
    }
}

// Définir les routes avec validation JSON Schema
export default async function bookRoutes(fastify, options) {
    fastify.get("/", { schema: { response: { 200: booksArrayResponseSchema } } }, getAllBooks);
    fastify.get("/:id", { schema: { response: { 200: bookResponseSchema } } }, getBookById);
    fastify.post("/", { schema: { body: bookSchema, response: { 201: bookResponseSchema } } }, createBook);
    fastify.put("/:id", { schema: { body: updateBookSchema, response: { 200: bookResponseSchema } } }, updateBook);
    fastify.delete("/:id", deleteBook);
}

