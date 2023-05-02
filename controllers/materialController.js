const Material = require("../models/materialModel");
const User = require("../models/userModel");


exports.uploadMaterial = async (req, res) => {
  try {
    const { title, description, batch, degree, moduleName, category } = req.body;
    const filePath = req.file.path;

    const newMaterial = new Material({
      title,
      description,
      filePath,
      batch,
      degree,
      category,
      moduleName
    });

    await newMaterial.save();
    res.status(201).json(newMaterial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMaterials = async (req, res) => {
  try {
    const materials = await Material.find({});
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.downloadMaterial = async (req, res) => {
  try {
    const materialId = req.params.id;
    const material = await Material.findById(materialId);

    if (!material) {
      return res.status(404).json({ error: "Material not found" });
    }

    res.download(material.filePath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFilteredMaterials = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { batch, degree, moduleName } = req.query;

    const filter = {};
    if (batch) filter.batch = batch;
    if (degree) filter.degree = degree;
    if (moduleName) filter.moduleName = moduleName;

    const materials = await Material.find(filter);
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
