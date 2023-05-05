module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            date: Date,
            transportID: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Transport",
                required: true
            },
            userID: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
                required: true
            },
            distance_km: {
              type: Number,
              required: true,
              validateBeforeSave: true
            },
            trip_category: {
                type: String,
                required: true,
                validateBeforeSave: true
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
                        type: Number | null,
                    },
                    co2: {
                        type: Number | null,
                    },
                    ch4: {
                        type: Number | null,
                    },
                    n2o: {
                        type: Number | null,
                    }
                }
            },
        },
        { timestamps: true },
        {
            query: {
                byUserId(userID) {
                    return this.where({userID: new RegExp(userID, 'i')})
                }
            }
        }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const User_Transport = mongoose.model("user_transport", schema);
    return User_Transport;
};
