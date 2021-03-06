const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialSchema = new Schema({
    name: {type: String, required: true, minlength: 1},
    category:  
    {
      type: String, 
      enum:['Architecture', 'Fabric', 'Ground', 'Metal', 'Plant', 'Stone', 'Synthetic', 'Wood'], 
      required: true
    },
    diffuse:    {type: String},
    specular:   {type: String},
    emissive:   {type: String},
    ambient:    {type: String},
    opacity:    {type: String},
    normal:     {type: String},
    bump:       {type: String},
    displace:   {type: String},
    reflection: {type: String},
    refraction: {type: String},
    tags: [{type: String}],
    author: {type: mongoose.Schema.Types.ObjectId, required: true, ref:'Author'}
});

const Material = mongoose.model('Material', materialSchema);

module.exports = Material;