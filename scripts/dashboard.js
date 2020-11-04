"use strict";

class Fetcher {
  // Fetching data from API and returning data converted with JSON
  getFetchData = () => {
    // return fetch("https://api.covid19api.com/summary", {
    //   method: "GET",
    //   mode: "cors",
    //   headers: {
    //     "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
    //     "x-rapidapi-key": "b71195a1a7msh5af8c981dcee164p1bf0bfjsnfb1c16ff1269",
    //   },
    // })
    return fetch("https://rapidapi.p.rapidapi.com/all", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "1bf6ccaf8emsha0a832033af9ea6p13172bjsn5177d51836c4",
        "x-rapidapi-host": "covidapi6.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      });
  };
}
class PrintData {
  constructor() {
    this.topInfeccionsDiv = document.querySelector("#topinfeccions");
    this.topDeathsDiv = document.querySelector("#topdeaths");
    this.topRecoveredDiv = document.querySelector("#toprecovered");
    this.topActiveDiv = document.querySelector("#topactive");
    this.countryDetailDiv = document.getElementById("detail-container");
  }
  printConfirmedSorted = (data) => {
    let topinfeccionsText = "";
    let fetchDate = data.last_date_updated.slice(0, 10);
    let fetchHour = data.last_date_updated.slice(11, 19);

    //Sort by New Confirmed
    const dataArr = data.country_statistics;
    // console.log("dataArr", dataArr);
    const confirmedArr = [...dataArr];
    confirmedArr.sort((a, b) => {
      return b.confirmed - a.confirmed;
    });
    this.topInfeccionsDiv.innerHTML = "";
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
      // console.log(confirmedArr[i].confirmed);
      topinfeccionsText += `
          <tr><td class="result">${
            confirmedArr[i].country
          } :</td><td class="result"> ${this.formatZeroResult(
        confirmedArr[i].confirmed
      )} </td></tr>
        `;
    }
    topinfeccionsText += `</tbody></table>`;

    articletopinfeccions.innerHTML = topinfeccionsText;
    this.topInfeccionsDiv.appendChild(articletopinfeccions);
  };

  printActiveSorted = (data) => {
    let topActiveText = "";
    let fetchDate = data.last_date_updated.slice(0, 10);
    let fetchHour = data.last_date_updated.slice(11, 19);
    const dataArr = data.country_statistics;
    const activesArr = [...dataArr];
    activesArr.sort((a, b) => {
      return b.active - a.active;
    });

    this.topActiveDiv.innerHTML = "";
    const articleTopActive = document.createElement("article");
    topActiveText += `<table>`;
    topActiveText += `<tr><th colspan="2"><h3>Top 10 active cases</h3><br>`;
    topActiveText += `
          <h6>Last update :  ${fetchDate} - ${fetchHour}</h6>
          </th></tr>
      `;

    for (let i = 0; i < 10; i++) {
      topActiveText += `

        <tr><td class="result">${
          activesArr[i].country
        } :</td><td class="result"> ${this.formatZeroResult(
        activesArr[i].active
      )} </td></tr>
      `;
    }
    topActiveText += `</table>`;
    articleTopActive.innerHTML = topActiveText;
    this.topActiveDiv.appendChild(articleTopActive);
  };

  printDeathsSorted = (data) => {
    let topDeathsText = "";
    let fetchDate = data.last_date_updated.slice(0, 10);
    let fetchHour = data.last_date_updated.slice(11, 19);
    const dataArr = data.country_statistics;
    const deathsArr = [...dataArr];
    deathsArr.sort((a, b) => {
      return b.deaths - a.deaths;
    });

    this.topDeathsDiv.innerHTML = "";
    const articleTopDeaths = document.createElement("article");
    topDeathsText += `<table>`;
    topDeathsText += `<tr><th colspan="2"><h3>Top 10 deaths cases</h3><br>`;
    topDeathsText += `
          <h6>Last update :  ${fetchDate} - ${fetchHour}</h6>
          </th></tr>
      `;

    for (let i = 0; i < 10; i++) {
      topDeathsText += `

        <tr><td class="result">${
          deathsArr[i].country
        } :</td><td class="result"> ${this.formatZeroResult(
        deathsArr[i].deaths
      )} </td></tr>
      `;
    }
    topDeathsText += `</table>`;
    articleTopDeaths.innerHTML = topDeathsText;
    this.topDeathsDiv.appendChild(articleTopDeaths);
  };

  printRecovered = (data) => {
    let topRecoveredText = "";
    let fetchDate = data.last_date_updated.slice(0, 10);
    let fetchHour = data.last_date_updated.slice(11, 19);
    const dataArr = data.country_statistics;
    const recoveredArr = [...dataArr];
    recoveredArr.sort((a, b) => {
      return b.recovered - a.recovered;
    });

    this.topRecoveredDiv.innerHTML = "";
    const articleTopRecovered = document.createElement("table");
    topRecoveredText += `<table>`;
    topRecoveredText += `<tr><th colspan="2"><h3>Top 10 recovered cases</h3><br>`;
    topRecoveredText += `
        <h6>Last update :  ${fetchDate} - ${fetchHour}</h6>
        </th></tr>
    `;

    for (let i = 0; i < 10; i++) {
      topRecoveredText += `

        <tr><td class="result">${
          recoveredArr[i].country
        } :</td><td class="result"> ${this.formatZeroResult(
        recoveredArr[i].recovered
      )} </td></tr>
      `;
    }
    topRecoveredText += `</table>`;
    articleTopRecovered.innerHTML = topRecoveredText;
    this.topRecoveredDiv.appendChild(articleTopRecovered);
  };

  printCountriesDropDown = (data) => {
    const dataArr = data.country_statistics;
    let fetchDate = data.last_date_updated.slice(0, 10);
    let fetchHour = data.last_date_updated.slice(11, 19);
    const listCountriesArr = [...dataArr];

    // Create Countries array for later use
    let countriesArr = [];
    for (let i = 0; i < listCountriesArr.length; i++) {
      countriesArr.push(listCountriesArr[i].country);
    }
    const dropdownDiv = document.createElement("div");
    dropdownDiv.classList.add("topten");
    let dropDownHTML = `<select name="countries" id="countries" class="select-css">`;
    dropDownHTML += `<option value=""></option>`;
    for (let i = 0; i < countriesArr.length; i++) {
      dropDownHTML += `<option value="${countriesArr[i]}" >${countriesArr[i]}</option>`;
    }
    dropDownHTML += `</select>`;
    dropdownDiv.innerHTML = dropDownHTML;
    this.countryDetailDiv.appendChild(dropdownDiv);

    dropdownDiv.addEventListener("change", (event) => {
      const selectedCountry = event.target.value;
      this.showCountryDetail(selectedCountry);
    });
  };

  showCountryDetail = (country) => {
    let countryDetailText = ";";
    const data = fetcher.getFetchData();
    fetcher.getFetchData().then((data) => {
      const dataArr = data.country_statistics;
      // console.log("dataArr", dataArr);
      const countriesArr = [...dataArr];
      let fetchDate = data.last_date_updated.slice(0, 10);
      let fetchHour = data.last_date_updated.slice(11, 19);
      let divCountryDetail = document.querySelector(".countrydetail");
      if (!divCountryDetail) {
        divCountryDetail = document.createElement("div");
      }
      divCountryDetail.innerHTML = "";
      divCountryDetail.classList.add("countrydetail");
      if (country === "") {
        countryDetailText = "NO COUNTRY PASSED";
      } else {
        countryDetailText = `<table>
      <thead>
        <tr>
        <th colspan="2" class="result"><h3>${country} cases - Updated</h3></th>
      </tr>
      </thead>`;
        for (let i = 0; i < countriesArr.length; i++) {
          // Creeating the div content to show detail

          if (countriesArr[i].country == country) {
            countryDetailText += `
          <tr>
            <td colspan="2" class="result"><h4>Fetch date :  ${fetchDate} - ${fetchHour}</h4><td>
          </tr>
          <tr><td class="result">active</td><td class="result aligncell">${this.formatZeroResult(
            countriesArr[i].active
          )}</td></tr>          
          <tr><td class="result">confirmed</td><td class="result aligncell">${this.formatZeroResult(
            countriesArr[i].confirmed
          )}</td></tr>
          <tr><td class="result">deaths</td><td class="result aligncell">${this.formatZeroResult(
            countriesArr[i].deaths
          )}</td></tr>
          <tr><td class="result">recovered</td><td class="result aligncell">${this.formatZeroResult(
            countriesArr[i].recovered
          )}</td></tr>
        `;
          }
        }
        countryDetailText += `
        </table>
      `;
      }
      divCountryDetail.innerHTML = countryDetailText;
      this.countryDetailDiv.appendChild(divCountryDetail);
    });
  };

  formatZeroResult = (num) => {
    if (num == 0 || num === "0") {
      return "N/A";
    } else {
      return num;
    }
  };
}
const fetcher = new Fetcher();
const printData = new PrintData();

const data = fetcher.getFetchData();

fetcher.getFetchData().then((data) => {
  printData.printActiveSorted(data);
  printData.printConfirmedSorted(data);
  printData.printDeathsSorted(data);
  printData.printRecovered(data);
  printData.printCountriesDropDown(data);
});
