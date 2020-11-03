"use strict";

const topInfeccionsDiv = document.querySelector("#topinfeccions");
const topDeathsDiv = document.querySelector("#topdeaths");
const topRecoveredDiv = document.querySelector("#toprecovered");
fetch("https://api.covid19api.com/summary", {
  method: "GET",
  headers: {
    "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
    "x-rapidapi-key": "b71195a1a7msh5af8c981dcee164p1bf0bfjsnfb1c16ff1269",
  },
})
  .then((response) => response.json())
  .then((data) => {
    let topinfeccionsText = "";
    let topDeathsText = "";
    let topRecoveredText = "";
    let fetchDate = data.Date.slice(0, 10);
    let fetchHour = data.Date.slice(11, 19);

    //Sort by New Confirmed
    const dataArr = data.Countries;
    const confirmedArr = [...dataArr];
    confirmedArr.sort((a, b) => {
      return b.NewConfirmed - a.NewConfirmed;
    });
    topInfeccionsDiv.innerHTML = "";
    const articletopinfeccions = document.createElement("article");

    topinfeccionsText += `<table>`;
    topinfeccionsText += `  <thead>
                                <tr>
                                    <th colspan="2"><h3>Top 10 New confirmed cases</h3></th>
                                </tr>

                                `;
    topinfeccionsText += `      <tr>
                                    <td colspan="2"><h6>Last update :  ${fetchDate} - ${fetchHour}</h6></td>
                                </tr>
                            </thead>
                            <tbody>
      `;

    for (let i = 0; i < 10; i++) {
      topinfeccionsText += `

        <tr><td class="result">${confirmedArr[i].Country} :</td><td class="result"> ${confirmedArr[i].NewConfirmed} </td></tr>
      `;
    }
    topinfeccionsText += `</tbody></table>`;

    articletopinfeccions.innerHTML = topinfeccionsText;
    topInfeccionsDiv.appendChild(articletopinfeccions);

    //Sort by NewDeaths
    const deathsArr = [...dataArr];
    deathsArr.sort((a, b) => {
      return b.NewDeaths - a.NewDeaths;
    });

    topDeathsDiv.innerHTML = "";
    const articleTopDeaths = document.createElement("article");
    topDeathsText += `<table>`;
    topDeathsText += `<tr><th colspan="2"><h3>Top 10 New deaths cases</h3><br>`;
    topDeathsText += `
          <h6>Last update :  ${fetchDate} - ${fetchHour}</h6>
          </th></tr>
      `;

    for (let i = 0; i < 10; i++) {
      topDeathsText += `

        <tr><td class="result">${deathsArr[i].Country} :</td><td class="result"> ${deathsArr[i].NewDeaths} </td></tr>
      `;
    }
    topDeathsText += `</table>`;
    articleTopDeaths.innerHTML = topDeathsText;
    topDeathsDiv.appendChild(articleTopDeaths);

    //Sort by NewRecovered
    const recoveredArr = [...dataArr];
    recoveredArr.sort((a, b) => {
      return b.NewRecovered - a.NewRecovered;
    });
    // recoveredArr.sort((a, b) => {
    //   if (b.NewRecovered > a.NewRecovered) {
    //     return 1;
    //   } else {
    //     return -1;
    //   }
    // });

    topRecoveredDiv.innerHTML = "";
    const articleTopRecovered = document.createElement("table");
    topRecoveredText += `<table>`;
    topRecoveredText += `<tr><th colspan="2"><h3>Top 10 New recovered cases</h3><br>`;
    topRecoveredText += `
        <h6>Last update :  ${fetchDate} - ${fetchHour}</h6>
        </th></tr>
    `;

    for (let i = 0; i < 10; i++) {
      console.log(typeof recoveredArr[i].NewRecovered);
      topRecoveredText += `

        <tr><td class="result">${recoveredArr[i].Country} :</td><td class="result"> ${recoveredArr[i].NewRecovered} </td></tr>
      `;
    }
    topRecoveredText += `</table>`;
    articleTopRecovered.innerHTML = topRecoveredText;
    topRecoveredDiv.appendChild(articleTopRecovered);
  })

  .catch((error) => console.log("error", error));
