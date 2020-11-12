const employees = require("../models/funcionarios.js");

const getAllEmployees = (req, res) => {
  employees.find((err, employees) => {
    if (err) {
      res.status(424).send({ message: err });
    } else {
      res.status(200).send(employees);
    }
  });
};

const employeeById = (req, res) => {
  const id = req.params.id;
  employees.find(
    { id },
    { nome: 1, sobrenome: 1, funcao: 1, _id: 0 },
    (err, employee) => {
      if (err) {
        res.status(424).send({ message: err.message });
      } else if (employee.length > 0) {
        res.status(200).send(employee);
      } else {
        res.status(404).send({ message: "Employee not found." });
      }
    }
  );
};

const getEmployeeList = (req, res) => {
  const employeesList = employees.map((namesList) => namesList.nome);
  res.status(200).send(employeesList);
};

const getEmployeeAge = (req, res) => {
  const id = req.params.id;
  const filteredEmployee = employees.find((employee) => employee.id == id);
  const employeeName = filteredEmployee.nome;
  const employeeBirth = filteredEmployee.dataNasc.split("/"); //.split() transforma a string em uma array, substituindo o <;> pela vírgula da array.

  const employeeAge = parseInt(2020) - parseInt(employeeBirth[2]); //subtração do ano atual (2020) com o ano de nascimento do funcionário que está no índice 2.
  res.status(200).send({
    nome: employeeName, // alteração da propriedade requerida para nome e idade
    idade: employeeAge,
  });
};

const registerEmployee = (req, res) => {
  employees.countDocuments((err, count) => {
    if (err) {
      res.status(424).send({ message: err.message });
    } else {
      let employee = new employees(req.body);
      employee.id = count + 1;
      employee.save((err) => {
        if (err) {
          res.status(424).send({ message: err.message });
        } else {
          res.status(201).send({
            status: true,
            message: "Employee successfully included!",
          });
        }
      });
    }
  });
};

const deleteEmployee = (req, res) => {
  const id = req.params.id;
  employees.deleteMany({ id }, (err) => {
    if (err) {
      res.status(424).send({ message: err.message });
    } else {
      res.status(200).send({ message: "Employee deleted successfully!" });
    }
  });
};

const updateEmployee = (req, res) => {
  const id = req.params.id;
  employees.updateMany({ id }, { $set: req.body }, { upsert: true }, (err) => {
    if (err) {
      res.status(424).send({ message: err.message });
    } else {
      res.status(200).send({ message: "Employee updated successfully!" });
    }
  });
};

module.exports = {
  getAllEmployees,
  employeeById,
  getEmployeeAge,
  getEmployeeList,
  registerEmployee,
  deleteEmployee,
  updateEmployee,
};
