const db = require("../models");
const Transport = db.transports;

// Create and Save a new Transport
exports.create = (req, res) => {

    // Create a Transport
    const transport = new Transport({
        name: req.body.name,
        activity_id: req.body.activity_id,
        uuid: req.body.uuid,
        access_type: req.body.access_type,
        source: req.body.source,
        source_dataset: req.body.source_dataset,
        year: req.body.year,
        region: req.body.region,
        category: req.body.category,
        lca_activity: req.body.lca_activity,
        data_quality_flags: req.body.data_quality_flags
    });

    // Save Transport in the database
    transport
        .save(transport)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Transport."
            });
        });
};

// Retrieve all Transports from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { title: { $regex: new RegExp(name), $options: "i" } } : {};

    Transport.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving transports."
            });
        });
};

// Find a single Transport with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Transport.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Transport with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Transport with id=" + id });
        });
};

// Update a Transport by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Transport.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Transport with id=${id}. Maybe Transport was not found!`
                });
            } else res.send({ message: "Transport was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Transport with id=" + id
            });
        });
};

// Delete a Transport with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Transport.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Transport with id=${id}. Maybe Transport was not found!`
                });
            } else {
                res.send({
                    message: "Transport was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Transport with id=" + id
            });
        });
};

// Delete all Transports from the database.
exports.deleteAll = (req, res) => {
    Transport.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Transports were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Transports."
            });
        });
};
