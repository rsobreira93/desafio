import { Router, Request, Response } from "express";
import { UserController } from "./controller/UserController";
import { AuthenticateUserController } from "./controller/AuthenticateUserController";
import { KeyController } from "./controller/KeyController";
import {CreateTransactionController} from "./controller/CreateTransactionController";
import {ensureAuthenticated} from "./middleware/ensureAuthenticaded";
import { ListUsersController } from "./controller/ListUsersController";
import { ListAllKeysController } from "./controller/ListAllKeysController";

const routes = Router();

const userController = new UserController();
const autheticateUserController = new AuthenticateUserController();
const keyController = new KeyController();
const createTransactionsController = new CreateTransactionController();
const listUsersController = new ListUsersController();
const listAllKeysController = new ListAllKeysController();

// home route
routes.get("/", (request: Request, response: Response) => {
    return response.json("Welcome to BrisPIX api");
});

// general routes
routes.post("/users", userController.handle);
routes.post("/login", autheticateUserController.handle);
routes.post("/keys", ensureAuthenticated, keyController.handle);
routes.post("/transactions", ensureAuthenticated, createTransactionsController.handle);


routes.get("/users", ensureAuthenticated, listUsersController.handle);
routes.get("/keys", ensureAuthenticated, listAllKeysController.handle);

export {routes};