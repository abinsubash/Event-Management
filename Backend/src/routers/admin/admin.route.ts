import { Router } from "express";
import { AdminRepositories } from "../../repositories/admin/implementation/admin.repositories";
import { AdminServices } from "../../services/admin/implementation/admin.services";
import { AdminController } from "../../controller/admin/implementation/admin.controller";
const admin_route = Router()
const adminRepositories = new AdminRepositories()
const adminServices = new AdminServices(adminRepositories)
const adminController = new AdminController(adminServices)

admin_route.post('/login',adminController.login.bind(adminController))
admin_route.post('/addCategoryes',adminController.addCategoryes.bind(adminController))
admin_route.post('/addAmenities',adminController.addAmenities.bind(adminController))

export default admin_route  