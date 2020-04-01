const fetch = require("node-fetch")
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const date = new Date();

const csvWriter = createCsvWriter({
    path: `${date.getMonth() + 1}-${date.getDate()}.csv`,
    header: [
        {id: 'state', title: 'State'},
        {id: 'positive', title: 'Positive'},
        {id: 'negative', title: 'Negative'},
        {id: 'pending', title: 'Pending'},
        {id: 'hospitalized', title: 'Hospitalized'},
        {id: 'deaths', title: 'Deaths'}
    ]
})

async function getData() {
    let response = await fetch("https://covidtracking.com/api/states");
    let data = await response.json()
    return data;
}

const total_data = []

getData().then(data => {
    for (const state_or_territory of data) {
        console.log("a");
        total_data.push({
            state: state_or_territory.state, 
            positive: state_or_territory.positive, 
            negative: state_or_territory.negative, 
            pending: state_or_territory.pending, 
            hospitalized: state_or_territory.hospitalized, 
            deaths: state_or_territory.death
        });
    }

    console.log(total_data);

    csvWriter.writeRecords(total_data).then(() => console.log("File Successfully Written!"));
});
