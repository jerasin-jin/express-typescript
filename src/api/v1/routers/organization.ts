import { Router } from "express";
import {
  getAllOrganizationsController,
  organizationControllerInit,
} from "../controllers";

export const OrganizationV1: Router = Router();

OrganizationV1.route("/init").post(organizationControllerInit);
OrganizationV1.route("").get(getAllOrganizationsController);
