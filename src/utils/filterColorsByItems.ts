import { shopItem } from "interfaces";

interface Color {
  Color_Name: string;
  GalleryValue: string;
}

export function filterColorsByItems(items: shopItem[], colors: Color[]): Color[] {
  const uniqueColorsSet = new Set<string>();

  // Add unique color values from items to the Set
  items.forEach((item) => {
    uniqueColorsSet.add(item.Color);
  });

  // Filter colors array based on Color_Name matching items' colors
  const filteredColors = colors.filter((color) =>
    uniqueColorsSet.has(color.Color_Name)
  );

  // Remove duplicate Color_Name entries
  const uniqueFilteredColors = Array.from(
    new Map(filteredColors.map((color) => [color.Color_Name, color])).values()
  );

  return uniqueFilteredColors;
}
