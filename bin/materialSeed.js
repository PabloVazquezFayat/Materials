require('dotenv').config();

const mongoose = require('mongoose');
const Material = require('../models/Material');

const dbName = 'materials';
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const materials = [
  {
    name: 'Red Bricks',
    category: 'Architecture',
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
    tags: ['#brick', '#redbrick'],
    author: '5d2bce160642a914df7f3752'
  },
  {
    name: 'Mahogany Wood Floor',
    category: 'Architecture',
    diffuse: '/images/mats/mahogany-diffuse.png',
    specular: '',
    emissive: '',
    ambient: '/images/mats/mahogany-ambient.png',
    opacity: '',
    normal: '/images/mats/mahogany-normal.png',
    bump: '',
    displace: '/images/mat/mahogany-height.png',
    reflection: '',
    refraction: '',
    tags: ['#wood', '#woodfloors'],
    author: '5d2bce160642a914df7f3752'
  }
];

Material.create(materials, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${materials.length} materials`)
  mongoose.connection.close();
});