const db = require('mongoose');

const userSchema = db.Schema({

    _id:                        db.Schema.Types.ObjectId,
    firstname:                  { type: String, required: true },
    lastname:                   { type: String, required: true },
    addressline:                { type: String, required: true },
    zipcode:                    { type: String, required: true },
    city:                       { type: String, required: true },
    country:                    { type: String, required: true },

    delivery_addressline:       { type: String, required: true },
    delivery_zipcode:           { type: String, required: true },
    delivery_city:              { type: String, required: true },
    delivery_country:           { type: String, required: true },

    dateofbirth:                { type: String, required: true },
    email:                      { type: String, required: true, unique: true},
    password:                   { type: String, required: true },

    created:                    { type: Date, default: Date.now },
    modified:                   { type: Date, default: Date.now }
    
});

module.exports = db.model("User", userSchema);

