module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
                validateBeforeSave: true
            },
            loggedIn: {
                type: Boolean,
                required: true,
                validateBeforeSave: true
            },
            lastLoggedIn: {
                type: Date,
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

    const User = mongoose.model("user", schema);
    return User;
};
