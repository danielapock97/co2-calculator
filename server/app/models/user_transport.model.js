module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            date: Date,
            transportID: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Transport"
            },
            userID: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User"
            },
            calculatedEmissions: {
                co2e: {
                    type: Number,
                    required: true,
                    validateBeforeSave: true
                },
                co2e_unit: {
                    type: String,
                    required: true,
                    validateBeforeSave: true
                },
                co2e_calculation_method: {
                    type: String,
                    required: true,
                    validateBeforeSave: true
                },
                co2e_calculation_origin: {
                    type: String,
                    required: true,
                    validateBeforeSave: true
                },
                constituent_gases: {
                    co2e_total: {
                        type: Number,
                        required: true,
                        validateBeforeSave: true
                    },
                    co2e_other: {
                        type: Number,
                        required: true,
                        validateBeforeSave: true
                    },
                    co2: {
                        type: Number,
                        required: true,
                        validateBeforeSave: true
                    },
                    ch4: {
                        type: Number,
                        required: true,
                        validateBeforeSave: true
                    },
                    n2o: {
                        type: Number,
                        required: true,
                        validateBeforeSave: true
                    }
                }
            },
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const User_Transport = mongoose.model("user_transport", schema);
    return User_Transport;
};
