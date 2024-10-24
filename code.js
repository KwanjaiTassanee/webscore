// Assuming you are using PapaParse to read CSV files

function readCSV(file) {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                resolve(results.data);
            },
            error: (error) => {
                reject(error);
            }
        });
    });
}

async function processForm(formObject, csvFile) {
    console.log(formObject);
    let result = "";
    if (formObject && formObject.searchtext) {
        const data = await readCSV(csvFile);
        result = search(data, formObject.searchtext);
    }
    return result;
}

function search(data, searchtext) {
    const resultArray = [];
    
    data.forEach((row) => {
        // Check if column D (assumed to be the fourth column) contains the search text
        if (row['D'] && row['D'].includes(searchtext)) {  // Use the appropriate key for your CSV
            resultArray.push([row['A'], row['B'], row['C']]);  // Push only columns A, B, C
        }
    });
    return resultArray;
}

// Example usage
const formObject = { searchtext: 'yourSearchTerm' };
const csvFile = 'quizII_G6.csv'; // Replace with actual file path

processForm(formObject, csvFile).then((result) => {
    console.log(result);
}).catch((error) => {
    console.error('Error processing CSV:', error);
});
