
from PIL import Image, ImageDraw
from pathlib import Path
import math

folder = Path("src/assets/images/artworks")

files = sorted([
    p for p in folder.iterdir()
    if p.suffix.lower() in [".jpg", ".jpeg", ".png", ".webp"]
])

columns = 5
cell_width = 200
cell_height = 230
rows = math.ceil(len(files) / columns)

sheet = Image.new(
    "RGB",
    (columns * cell_width, rows * cell_height),
    "#F5F1E9"
)

draw = ImageDraw.Draw(sheet)

with open("artwork_index.txt", "w") as index:
    for i, path in enumerate(files):
        try:
            image = Image.open(path).convert("RGB")
            image.thumbnail((180, 185))

            x = (i % columns) * cell_width
            y = (i // columns) * cell_height

            image_x = x + (cell_width - image.width) // 2
            image_y = y + 5

            sheet.paste(image, (image_x, image_y))

            draw.text(
                (x + 10, y + 195),
                f"IMAGE {i + 1}",
                fill="#102D32"
            )

            index.write(f"{i + 1}: {path.name}\n")

        except Exception as error:
            print(f"Could not process {path}: {error}")

sheet.save("artwork_contact_sheet.jpg", quality=90)

print(f"Created contact sheet for {len(files)} images.")
