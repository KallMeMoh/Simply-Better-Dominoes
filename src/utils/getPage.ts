export async function getPage(fileName: string) {
  try {
    const module = await import(`../../pages/${fileName}.js`);
    return module.default;
  } catch (e: any) {
    throw new Error(`Failed to load page "${fileName}": ${e.message}`);
  }
}
