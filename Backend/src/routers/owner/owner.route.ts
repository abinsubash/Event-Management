import { Router } from "express";
import { OwnerRepositories } from "../../repositories/owner/implementation/owner.repositories";
import { OwnerServices } from "../../services/owner/implementation/owner.services";
import { OwnerController } from "../../controller/owner/implementation/owner.controller";

const owner_route = Router();

// Dependency injection
const ownerRepositories = new OwnerRepositories();
const ownerServices = new OwnerServices(ownerRepositories);
const ownerController = new OwnerController(ownerServices);

owner_route.get('/getAllCategories', ownerController.getAllCategories.bind(ownerController));
owner_route.get('/getAllAmenities', ownerController.getAllAmenities.bind(ownerController))

export default owner_route;