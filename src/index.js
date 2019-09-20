const editJsonFile = require('edit-json-file');
const fs = require('fs');

const deliveryPath = '/Users/sakpandey/Documents/code/expedia/ads-delivery-sandbox/ads-delivery-config/json/delivery.json';
const deliveryMap = JSON.parse(fs.readFileSync(deliveryPath));

const defaultMap = JSON.parse(fs.readFileSync(`${__dirname}/../json/default.json`));
const defaultFslMap = JSON.parse(fs.readFileSync(`${__dirname}/../json/defaultfsl.json`));

const siteIdMap = JSON.parse(fs.readFileSync(`${__dirname}/../json/siteid.json`));


const pageTypes = Object.keys(deliveryMap).filter(m => m.includes('page.Flight-'));

pageTypes.forEach(page => {
    Object.keys(siteIdMap).forEach(siteId => {
        siteIdMap[siteId].forEach(locale => {
            let dMap = (page.includes('-Roundtrip') || page.includes('-Oneway')) ? defaultFslMap : defaultMap;
            if(!deliveryMap[page][siteId]) {
                deliveryMap[page][siteId] = {};
            }
            if(!deliveryMap[page][siteId][locale]) {
                deliveryMap[page][siteId][locale] = {};
            }
            deliveryMap[page][siteId][locale]['default'] = dMap;
        });
    });
});

// const path = 'page.Flight-Search-MDest';
// console.log(JSON.stringify(deliveryMap[path]['70201']['en_US']['default']) + '\n\n\n');

// deliveryMap[path]['70201']['en_US']['default'] = defaultMap;

//console.log(JSON.stringify(deliveryMap[path]['70201']['en_US']['default']));


fs.writeFileSync(deliveryPath, '');
fs.writeFileSync(deliveryPath, JSON.stringify(deliveryMap, null, 4));

// const deliveryResultMap = JSON.parse(fs.readFileSync(`${__dirname}/../json/delivery.json`));
// console.log(JSON.stringify(deliveryResultMap[path]['70201']['en_US']['default']));

//fs.writeFileSync(`${__dirname}/../json/deliveryResult.json`, 'utf8', null, 4);

// fs.writeFile(`${__dirname}/../json/deliveryResult.json`, JSON.stringify(deliveryMap), (err) => {
//     if(err) {
//         console.log('Error: ', err);
//     } else {
//         const deliveryResultMap = JSON.parse(fs.readFileSync(`${__dirname}/../json/deliveryResult.json`, 'utf-8', null, 4));
//         console.log(JSON.stringify(deliveryResultMap[path]['70201']['en_US']['default']));
//     }
// });
