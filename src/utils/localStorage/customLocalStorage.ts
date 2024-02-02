export function saveToLocalStorage({
  itemName,
  content,
}: {
  itemName: string;
  content: any;
}) {
  try {
    // Convert content to a string before saving to local storage
    const contentString = JSON.stringify(content);

    // Save to local storage
    localStorage.setItem(itemName, contentString);

    console.log(`Item '${itemName}' saved to local storage.`);
  } catch (error) {
    console.error("Error saving to local storage:", error);
  }
}
