export async function getPage(fileName) {
  try {
    const module = await import(`./${fileName}.js`);
    return module.default;
  } catch (e) {
    throw new Error(`Failed to load page "${fileName}": ${e.message}`);
  }
}
