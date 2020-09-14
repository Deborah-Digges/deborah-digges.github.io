module.exports = {
  extractMetadataFromFilename: (fileName) => {
    const [year, month, date, ...title ] = fileName.substring(1).split("-");
    return {
      date: `${year}-${month}-${date}`,
      slug: `${year}/${month}/${date}/${title.join("-")}`
    }
  },
  isBlogPostFileName: (fileName) => {
    return /^\/[0-9]{4}-[0-9]{2}-[0-9]{2}-.*/.test(fileName)
  }
};