const sharp = require("sharp");
const fs = require("fs");

module.exports = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const filePath = req.file.path;
    const fileName = req.file.filename;
    const outputFilePath = `images/optimized-${fileName}`;

    await sharp(filePath)
      .resize(800, 600, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toFile(outputFilePath);

    fs.unlink(filePath, (err) => {
      if (err)
        console.error(
          "Erreur lors de la suppression du fichier original:",
          err
        );
    });

    req.file.path = outputFilePath;
    req.file.filename = `optimized-${fileName}`;

    next();
  } catch (error) {
    next(error);
  }
};
