module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
                validateBeforeSave: true
            },
            activity_id: {
                type: String,
                required: true,
                validateBeforeSave: true
            },
            uuid: {
                type: String,
                required: true,
                validateBeforeSave: true
            },
            access_type: {
                type: String,
                required: true,
                validateBeforeSave: true
            },
            source: {
                type: String,
                required: true,
                validateBeforeSave: true
            },
            source_dataset: {
                type: String,
                required: true,
                validateBeforeSave: true
            },
            year: {
                type: String,
                required: true,
                validateBeforeSave: true
            },
            region: {
                type: String,
                required: true,
                validateBeforeSave: true
            },
            category: {
                type: String,
                required: true,
                validateBeforeSave: true
            },
            lca_activity: {
                type: String,
                required: true,
                validateBeforeSave: true
            },
            data_quality_flags: {
                type: [],
                required: false,
            },
            emissionfactor: {
                type: Number,
                required: true,
                validateBeforeSave: true
            },
            factor_calculation_method: {
                type: Number,
                required: true,
                validateBeforeSave: true
            },
            unit: {
                type: String,
                required: true,
                validateBeforeSave: true
            },
            description: {
                type: String,
                required: true,
                validateBeforeSave: true
            }
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Transport = mongoose.model("transport", schema);
    return Transport;
};
