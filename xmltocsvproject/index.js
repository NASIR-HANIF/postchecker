const fs = require('fs');
const xml2js = require('xml2js');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const xmlFilePath = "C:/Users/rehman/Desktop/postchecker/xmltocsvproject/xmldata/myurlpro.xml";
const csvDirectory = "C:/Users/rehman/Desktop/postchecker/xmltocsvproject/csvdata";
const csvFileName = "myurlpro.csv";
const csvFilePath = path.join(csvDirectory, csvFileName);

// Function to strip BOM and trim leading/trailing whitespace
function cleanXmlData(xmlData) {
    if (xmlData.charCodeAt(0) === 0xFEFF) {
        xmlData = xmlData.slice(1);
    }
    return xmlData.trim();
}

// Function to convert XML to CSV
async function xmlToCsv(xmlFilePath, csvFilePath) {
    try {
        let xmlData = fs.readFileSync(xmlFilePath, 'utf8');
        xmlData = cleanXmlData(xmlData);

        const parser = new xml2js.Parser();
        const parsedData = await parser.parseStringPromise(xmlData);

        const urls = parsedData.urlset.url.map(entry => ({
            loc: entry.loc[0]
        }));

        const csvWriter = createCsvWriter({
            path: csvFilePath,
            header: [
                {id: 'loc', title: 'Location'}
            ]
        });

        await csvWriter.writeRecords(urls);

        console.log(`CSV file has been written to ${csvFilePath}`);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Example usage
xmlToCsv(xmlFilePath, csvFilePath);
