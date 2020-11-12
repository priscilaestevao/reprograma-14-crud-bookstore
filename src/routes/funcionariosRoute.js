const express = require("express");
const router = express.Router();
const controller = require("../controller/funcionariosController");

router.get("/", controller.getAllEmployees);
router.get("/idade/:id", controller.getEmployeeAge);
router.get("/lista-nomes", controller.getEmployeeList);
router.get("/:id", controller.employeeById);
router.post("/", controller.registerEmployee);
router.delete("/:id", controller.deleteEmployee);
router.put("/:id", controller.updateEmployee);

module.exports = router;
