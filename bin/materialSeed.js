const mongoose = require('mongoose');
const Material = require('../models/Material');

const dbName = 'materials';
mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true });

const materials = [
  {
    name: 'Red Bricks',
    catergory: 'architecture',
    diffuse: '/images/mats/redbricks-diffuse.png',
    specular: '',
    emissive: '',
    ambient: '/images/mats/redbricks-ambient-occlusion.png',
    opacity: '',
    normal: '/images/mats/redbricks-normal.png',
    bump: '',
    displace: '/images/mat/redbricks-height.png',
    reflection: '',
    refraction: '',
    tags: ['#bricks', '#redbricks'],
    author: '5d2bce160642a914df7f3752'
  }
];

Material.create(materials, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${materials.length} materials`)
  mongoose.connection.close();
});