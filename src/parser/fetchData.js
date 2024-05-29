const axios = require('axios');
const cheerio = require('cheerio');



export async function getChampionList() {
    try {
        const url = "https://leagueoflegends.fandom.com/wiki/List_of_champions";
        const response = await axios.get(url);

        const $ = cheerio.load(response.data);

        const table = $('.article-table');

        const championNames = [];

        table.find('tr').each((index, element) => {
            const cells = $(element).find('td');
            
            const dataSortValue = $(cells[0]).attr('data-sort-value');

            const championName = dataSortValue;
            if (championName) { 
                championNames.push({name: championName});
            }
        });
        return championNames;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}