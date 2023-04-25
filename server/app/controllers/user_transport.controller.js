const db = require("../models");
const User_transport = db.user_transports;

// Create and Save a new User_transport
exports.create = (req, res) => {
    // Create a User_transport
    const user_transport = new User_transport({
        date: req.body.date,
        transportID: req.body.transportID,
        userID: req.body.userID,
        distance_km: req.body.distance_km,
        calculatedEmissions: {
            co2e: req.body.co2e,
            co2e_unit: req.body.co2e_unit,
            co2e_calculation_method: req.body.co2e_calculation_method,
            co2e_calculation_origin: req.body.co2e_calculation_origin,
            constituent_gases: {
                co2e_total: req.body.co2e_total,
                co2e_other: req.body.co2e_other,
                co2: req.body.co2,
                ch4: req.body.ch4,
                n2o: req.body.n2o
            }
        },
    });

    // Save User_transport in the database
    user_transport
        .save(user_transport)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User_transport."
            });
        });
};

// Retrieve all User_transports from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { title: { $regex: new RegExp(name), $options: "i" } } : {};

    User_transport.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user_transports."
            });
        });
};

// Find a single User_transport with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User_transport.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found User_transport with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving User_transport with id=" + id });
        });
};

// Update a User_transport by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    User_transport.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User_transport with id=${id}. Maybe User_transport was not found!`
                });
            } else res.send({ message: "User_transport was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User_transport with id=" + id
            });
        });
};

// Delete a User_transport with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User_transport.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete User_transport with id=${id}. Maybe User_transport was not found!`
                });
            } else {
                res.send({
                    message: "User_transport was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User_transport with id=" + id
            });
        });
};

// Delete all User_transports from the database.
exports.deleteAll = (req, res) => {
    User_transport.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} User_transports were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all User_transports."
            });
        });
};
