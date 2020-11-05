"use strict";

const topInfeccionsDiv = document.querySelector("#topinfeccions");
const topDeathsDiv = document.querySelector("#topdeaths");
const topRecoveredDiv = document.querySelector("#toprecovered");
const countryDetailDiv = document.getElementById("detail-container");
fetch("https://api.covid19api.com/summary", {
  method: "GET",
  headers: {
    "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
    "x-rapidapi-key": "b71195a1a7msh5af8c981dcee164p1bf0bfjsnfb1c16ff1269",
  },
})
  // fetch("https://rapidapi.p.rapidapi.com/all", {
  //   method: "GET",
  //   headers: {
  //     "x-rapidapi-key": "1bf6ccaf8emsha0a832033af9ea6p13172bjsn5177d51836c4",
  //     "x-rapidapi-host": "covidapi6.p.rapidapi.com",
  //   },
  // })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let topinfeccionsText = "";
    let topDeathsText = "";
    let topRecoveredText = "";
    let fetchDate = data.last_date_updated.slice(0, 10);
    let fetchHour = data.last_date_updated.slice(11, 19);

    //Sort by New Confirmed
    const dataArr = data.country_statistics;
    const confirmedArr = [...dataArr];
    confirmedArr.sort((a, b) => {
      return b.confirmed - a.confirmed;
    });
    topInfeccionsDiv.innerHTML = "";
    const articletopinfeccions = document.createElement("article");

    topinfeccionsText += `<table>`;
    topinfeccionsText += `  <thead>
                                <tr>
                                    <th colspan="2"><h3>Top 10 confirmed cases</h3></th>
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

        <tr><td class="result">${confirmedArr[i].country} :</td><td class="result"> ${confirmedArr[i].confirmed} </td></tr>
      `;
    }
    topinfeccionsText += `</tbody></table>`;

    articletopinfeccions.innerHTML = topinfeccionsText;
    topInfeccionsDiv.appendChild(articletopinfeccions);

    //Sort by deaths
    const deathsArr = [...dataArr];
    deathsArr.sort((a, b) => {
      return b.deaths - a.deaths;
    });

    topDeathsDiv.innerHTML = "";
    const articleTopDeaths = document.createElement("article");
    topDeathsText += `<table>`;
    topDeathsText += `<tr><th colspan="2"><h3>Top 10 deaths cases</h3><br>`;
    topDeathsText += `
          <h6>Last update :  ${fetchDate} - ${fetchHour}</h6>
          </th></tr>
      `;

    for (let i = 0; i < 10; i++) {
      topDeathsText += `

        <tr><td class="result">${deathsArr[i].country} :</td><td class="result"> ${deathsArr[i].deaths} </td></tr>
      `;
    }
    topDeathsText += `</table>`;
    articleTopDeaths.innerHTML = topDeathsText;
    topDeathsDiv.appendChild(articleTopDeaths);

    //Sort by recovered
    const recoveredArr = [...dataArr];
    recoveredArr.sort((a, b) => {
      return b.recovered - a.recovered;
    });
    console.log(recoveredArr);
    // Create Countries array for later use
    let countriesArr = [];
    for (let i = 0; i < confirmedArr.length; i++) {
      countriesArr.push(confirmedArr[i].country);
    }

    topRecoveredDiv.innerHTML = "";
    const articleTopRecovered = document.createElement("table");
    topRecoveredText += `<table>`;
    topRecoveredText += `<tr><th colspan="2"><h3>Top 10 recovered cases</h3><br>`;
    topRecoveredText += `
        <h6>Last update :  ${fetchDate} - ${fetchHour}</h6>
        </th></tr>
    `;

    for (let i = 0; i < 10; i++) {
      //console.log(typeof recoveredArr[i].recovered);
      topRecoveredText += `

        <tr><td class="result">${recoveredArr[i].country} :</td><td class="result"> ${recoveredArr[i].recovered} </td></tr>
      `;
    }
    topRecoveredText += `</table>`;
    articleTopRecovered.innerHTML = topRecoveredText;
    topRecoveredDiv.appendChild(articleTopRecovered);

    const dropdownDiv = document.createElement("div");
    dropdownDiv.classList.add("topten");
    let dropDownHTML = `<select name="countries" id="countries" class="select-css">`;
    for (let i = 0; i < countriesArr.length; i++) {
      dropDownHTML += `<option value="${countriesArr[i]}" >${countriesArr[i]}</option>`;
    }
    dropDownHTML += `</select>`;
    dropdownDiv.innerHTML = dropDownHTML;
    countryDetailDiv.appendChild(dropdownDiv);

    dropdownDiv.addEventListener("change", (event) => {
      const selectedCountry = event.target.value;
      showCountryDetail(selectedCountry);
    });
  })

  .catch((error) => console.log("error", error));

function showCountryDetail(country) {
  console.log(country);
  const countriesArr = [...dataArr];
  const divCountryDetail = document.createElement("div");
  divCountryDetail.classList.add("topten");
  for (i = 0; i < countriesArr.length; i++) {
    // Creeating the div content to show detail
    let countryDetailText = `<table>
                              <thead>
                                <tr>
                                <th colspan="2" class="result"><h3>Spain cases - Updated</h3></th>
                              </tr>
                              </thead>`;

    for (i = 0; i < spainDetailObj.length; i++) {
      if (spainDetailObj[i].country == "Spain") {
        countryDetailText += `
        <tr>
          <td colspan="2" class="result"><h4>Fetch date :  ${fetchDate} - ${fetchHour}</h4><td>
        </tr>
        
        <tr><td class="result">NewConfirmed</td><td class="result aligncell">${spainDetailObj[i].confirmed}</td></tr>
        <tr><td class="result">deaths</td><td class="result aligncell">${spainDetailObj[i].deaths}</td></tr>
        <tr><td class="result">recovered</td><td class="result aligncell">${spainDetailObj[i].recovered}</td></tr>
        <tr><td colspan ="2"><hr></td></tr>
        <tr><td class="result">TotalConfirmed</td><td class="result aligncell">${spainDetailObj[i].TotalConfirmed}</td></tr>
        <tr><td class="result">TotalConfirmed</td><td class="result aligncell">${spainDetailObj[i].TotalDeaths}</td></tr>
        <tr><td class="result">TotalConfirmed</td><td class="result aligncell">${spainDetailObj[i].TotalRecovered}</td></tr>
      `;
      }
    }
    countryDetailText += `
      </table>
    `;
    divCountryDetail.innerHTML = countryDetailText;
    divCountryDetail.appendChild(countryDetailDiv);
  }
}
