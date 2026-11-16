
const imageModules = import.meta.glob(
  "../assets/images/artworks/**/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const categoryNames = {
  drawing: "Drawing",
  "plate-decoration": "Plate Decoration",
  "art-class": "Art Class",
  "mehndi-cones": "Mehndi & Cone Sales",
  "project-craft": "Project & Craft Work",
};

const artworks = Object.entries(imageModules).map(
  ([path, image], index) => {
    const folder = path.split("/").slice(-2, -1)[0];

    return {
      id: index + 1,
      image,
      category: categoryNames[folder] || "Uncategorized",
      title: `Artwork ${index + 1}`,
    };
  }
);

export default artworks;
