"use strict";

class Fetcher {
  // Fetching data from API and returning data converted with JSON
  getFetchData = () => {
    return (
      fetch("https://api.covid19api.com/summary", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
          "x-rapidapi-key":
            "b71195a1a7msh5af8c981dcee164p1bf0bfjsnfb1c16ff1269",
        },
      })
        // return fetch("https://rapidapi.p.rapidapi.com/all", {
        //   method: "GET",
        //   headers: {
        //     "x-rapidapi-key": "1bf6ccaf8emsha0a832033af9ea6p13172bjsn5177d51836c4",
        //     "x-rapidapi-host": "covidapi6.p.rapidapi.com",
        //   },
        // })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          return data;
        })
    );
  };
}
class PrintData {
  constructor() {
    this.topInfeccionsDiv = document.querySelector("#topinfeccions");
    this.topDeathsDiv = document.querySelector("#topdeaths");
    this.topRecoveredDiv = document.querySelector("#toprecovered");
    this.topActiveDiv = document.querySelector("#topactive");
    this.countryDetailDiv = document.getElementById("detail-container");
    this.coronaList = document.querySelector(".content-left");
    this.spainDetail = document.querySelector(".content-right");
  }

  printWorldResume = (data) => {
    //Change it if change the API to rapid API

    // BLOCK TO SWITCH  /////
    // const globalObj = data;
    // let fetchDate = data.last_date_updated.slice(0, 10);
    // let fetchHour = data.last_date_updated.slice(11, 19);
    const globalObj = data.Global;
    let fetchDate = data.Date.slice(0, 10);
    let fetchHour = data.Date.slice(11, 19);
    ///// END BLOCK TO CHANGE////

    //console.log(data);
    this.coronaList.innerHTML = "";
    const articleCorona = document.createElement("article");
    let articleCoronaText = `<table>
                            <thead>
                              <tr>
                              <th colspan="2" class="result"><h3>World cases - Updated</h3></th>
                            </tr>
                            </thead>`;
    articleCoronaText += `
                            <tr>
                              <td colspan="2" class="result"><h4>Fetch date :  ${fetchDate} - ${fetchHour}</h4><td>
                            </tr>`;
    // BLOCK TO SWITCH  /////
    // articleCoronaText += `
    //                         <tr><td class="result">NewConfirmed</td><td class="result aligncell">${globalObj.total_confirmed}</td></tr>
    //                         <tr><td class="result">NewDeaths</td><td class="result aligncell">${globalObj.total_deaths}</td></tr>
    //                         <tr><td class="result">NewRecovered</td><td class="result aligncell">${globalObj.total_recovered}</td></tr>
    //                       `;
    articleCoronaText += `
    <tr><td class="result">New confirmed</td><td class="result aligncell">${globalObj.NewConfirmed}</td></tr>
    <tr><td class="result">New deaths</td><td class="result aligncell">${globalObj.NewDeaths}</td></tr>
    <tr><td class="result">New recovered</td><td class="result aligncell">${globalObj.NewRecovered}</td></tr>
    <tr><td colspan="2"><hr></td></tr>
    <tr><td class="result">Total confirmed</td><td class="result aligncell">${globalObj.TotalConfirmed}</td></tr>
    <tr><td class="result">Total deaths</td><td class="result aligncell">${globalObj.TotalDeaths}</td></tr>
    <tr><td class="result">Total recovered</td><td class="result aligncell">${globalObj.TotalRecovered}</td></tr>
  `;
    /// END BLOCK TO CHANGE ////
    articleCoronaText += `
                          </table>
                        `;
    articleCorona.innerHTML = articleCoronaText;
    this.coronaList.appendChild(articleCorona);
  };

  printSpainResume = (data) => {
    //Change it if change the API to rapid API

    // BLOCK TO SWITCH  /////
    // const spainDetailObj = data.country_statistics;
    // let fetchDate = data.last_date_updated.slice(0, 10);
    // let fetchHour = data.last_date_updated.slice(11, 19);
    const spainDetailObj = data.Countries;
    let fetchDate = data.Date.slice(0, 10);
    let fetchHour = data.Date.slice(11, 19);
    ///// END BLOCK TO CHANGE////
    this.spainDetail.innerHTML = "";
    const articleSpainDetail = document.createElement("article");
    let spainDetailText = `<table>
                              <thead>
                                <tr>
                                <th colspan="2" class="result"><h3>Spain cases - Updated</h3></th>
                              </tr>
                              </thead>`;

    for (let i = 0; i < spainDetailObj.length; i++) {
      if (spainDetailObj[i].Country == "Spain") {
        // BLOCK TO SWITCH  /////
        //   spainDetailText += `
        //   <tr>
        //     <td colspan="2" class="result"><h4>Fetch date :  ${fetchDate} - ${fetchHour}</h4><td>
        //   </tr>

        //   <tr><td class="result">Total Active</td><td class="result aligncell">${spainDetailObj[i].active}</td></tr>
        //   <tr><td class="result">Total Confirmed</td><td class="result aligncell">${spainDetailObj[i].confirmed}</td></tr>
        //   <tr><td class="result">Total Detahs</td><td class="result aligncell">${spainDetailObj[i].deaths}</td></tr>
        //   <tr><td class="result">Total Recovered</td><td class="result aligncell">${spainDetailObj[i].recovered}</td></tr>
        // `;
        spainDetailText += `
      <tr>
        <td colspan="2" class="result"><h4>Fetch date :  ${fetchDate} - ${fetchHour}</h4><td>
      </tr>
      
      <tr><td class="result">New confirmed</td><td class="result aligncell">${spainDetailObj[i].NewConfirmed}</td></tr>
      <tr><td class="result">New deaths</td><td class="result aligncell">${spainDetailObj[i].NewDeaths}</td></tr>
      <tr><td class="result">New recovered</td><td class="result aligncell">${spainDetailObj[i].NewRecovered}</td></tr>
      <tr><td colspan="2"><hr></td></tr>
      <tr><td class="result">Total confirmed</td><td class="result aligncell">${spainDetailObj[i].TotalConfirmed}</td></tr>
      <tr><td class="result">Total deaths</td><td class="result aligncell">${spainDetailObj[i].TotalDeaths}</td></tr>
      <tr><td class="result">Total recovered</td><td class="result aligncell">${spainDetailObj[i].TotalRecovered}</td></tr>
    `;
      }
    }
    /// END BLOCK TO CHANGE ////

    spainDetailText += `
      </table>
    `;
    articleSpainDetail.innerHTML = spainDetailText;
    this.spainDetail.appendChild(articleSpainDetail);
  };

  // Print data corted per Confirmed
  printConfirmedSorted = (data) => {
    //Change it if change the API to rapid API

    // BLOCK TO SWITCH  /////
    // const dataArr = data.country_statistics;
    // let fetchDate = data.last_date_updated.slice(0, 10);
    // let fetchHour = data.last_date_updated.slice(11, 19);
    //Sort by New Confirmed
    const dataArr = data.Countries;
    // console.log(dataArr);
    let fetchDate = data.Date.slice(0, 10);
    let fetchHour = data.Date.slice(11, 19);
    ///// END BLOCK TO CHANGE////
    let topinfeccionsText = "";

    //console.log("dataArr", dataArr);
    const confirmedArr = [...dataArr];

    // BLOCK TO SWITCH  /////
    // confirmedArr.sort((a, b) => {
    //   return b.confirmed - a.confirmed;
    // });
    confirmedArr.sort((a, b) => {
      return b.NewConfirmed - a.NewConfirmed;
    });
    ///// END BLOCK TO CHANGE////

    this.topInfeccionsDiv.innerHTML = "";
    const articletopinfeccions = document.createElement("article");

    topinfeccionsText += `<table>`;
    topinfeccionsText += `  <thead>
                                  <tr>
                                      <th colspan="3"><h3>Top 10 new confirmed cases</h3></th>
                                  </tr>
  
                                  `;
    topinfeccionsText += `      <tr>
                                      <td colspan="3"><h6>Last update :  ${fetchDate} - ${fetchHour}</h6></td>
                                  </tr>
                              </thead>
                              <tbody>
        `;

    for (let i = 0; i < 10; i++) {
      // console.log(confirmedArr[i].confirmed);
      // BLOCK TO SWITCH  /////
      //     topinfeccionsText += `
      //     <tr><td><img src="${
      //       confirmedArr[i].flag
      //     }" class="flag"></td><td class="result">${
      //   confirmedArr[i].country
      // } :</td><td class="result"> ${this.formatZeroResult(
      //   confirmedArr[i].confirmed
      // )} </td></tr>
      //   `;
      topinfeccionsText += `
            <tr><td><img src="https://www.countryflags.io/${
              confirmedArr[i].CountryCode
            }/flat/64.png" class="flag"></td><td class="result">${
        confirmedArr[i].Country
      } :</td><td class="result"> ${this.formatZeroResult(
        confirmedArr[i].NewConfirmed
      )} </td></tr>
          `;
      ///// END BLOCK TO CHANGE////
    }
    topinfeccionsText += `</tbody></table>`;

    articletopinfeccions.innerHTML = topinfeccionsText;
    this.topInfeccionsDiv.appendChild(articletopinfeccions);
  };

  printActiveSorted = (data) => {
    //THIS DATA IS NOT PROVIDED BY API19
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
    topActiveText += `<tr><th colspan="3"><h3>Top 10 active cases</h3><br>`;
    topActiveText += `
          <h6>Last update :  ${fetchDate} - ${fetchHour}</h6>
          </th></tr>
      `;

    for (let i = 0; i < 10; i++) {
      topActiveText += `

        <tr><td><img src="${
          activesArr[i].flag
        }" class="flag"></td><td class="result">${
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

  printTotalConfirmed = (data) => {
    //THIS DATA IS NOT PROVIDED BY API19
    let topActiveText = "";
    const dataArr = data.Countries;
    let fetchDate = data.Date.slice(0, 10);
    let fetchHour = data.Date.slice(11, 19);
    const activesArr = [...dataArr];
    // console.log(activesArr);
    activesArr.sort((a, b) => {
      return b.TotalConfirmed - a.TotalConfirmed;
    });

    this.topActiveDiv.innerHTML = "";
    const articleTopActive = document.createElement("article");
    topActiveText += `<table>`;
    topActiveText += `<tr><th colspan="3"><h3>Top 10 total Confirmed cases</h3><br>`;
    topActiveText += `
          <h6>Last update :  ${fetchDate} - ${fetchHour}</h6>
          </th></tr>
      `;

    for (let i = 0; i < 10; i++) {
      topActiveText += `

        <tr><td><img src="https://www.countryflags.io/${
          activesArr[i].CountryCode
        }/flat/64.png" class="flag"></td><td class="result">${
        activesArr[i].Country
      } :</td><td class="result"> ${this.formatZeroResult(
        activesArr[i].TotalConfirmed
      )} </td></tr>
      `;
    }
    topActiveText += `</table>`;
    articleTopActive.innerHTML = topActiveText;
    this.topActiveDiv.appendChild(articleTopActive);
  };

  printDeathsSorted = (data) => {
    //Change it if change the API to rapid API

    // BLOCK TO SWITCH  /////
    // const dataArr = data.country_statistics;
    // let fetchDate = data.last_date_updated.slice(0, 10);
    // let fetchHour = data.last_date_updated.slice(11, 19);
    // const deathsArr = [...dataArr];
    // deathsArr.sort((a, b) => {
    //   return b.deaths - a.deaths;
    // });
    //Sort by New Confirmed
    const dataArr = data.Countries;
    let fetchDate = data.Date.slice(0, 10);
    let fetchHour = data.Date.slice(11, 19);
    const deathsArr = [...dataArr];
    deathsArr.sort((a, b) => {
      return b.NewDeaths - a.NewDeaths;
    });
    ///// END BLOCK TO CHANGE////
    let topDeathsText = "";

    this.topDeathsDiv.innerHTML = "";
    const articleTopDeaths = document.createElement("article");
    topDeathsText += `<table>`;
    topDeathsText += `<tr><th colspan="3"><h3>Top 10 deaths cases</h3><br>`;
    topDeathsText += `
          <h6>Last update :  ${fetchDate} - ${fetchHour}</h6>
          </th></tr>
      `;

    for (let i = 0; i < 10; i++) {
      /// BLOCK TO SWITCH ////
      //     topRecoveredText += `

      //     <tr><td><img src="${
      //       recoveredArr[i].flag
      //     }" class="flag"></td><td class="result">${
      //     recoveredArr[i].country
      //   } :</td><td class="result"> ${this.formatZeroResult(
      //     recoveredArr[i].deaths
      //   )} </td></tr>
      //   `;
      // }
      ///// END BLOCK TO SWITCH ////
      topDeathsText += `
      <tr><td><img src="https://www.countryflags.io/${
        deathsArr[i].CountryCode
      }/flat/64.png" class="flag"></td><td class="result">${
        deathsArr[i].Country
      } :</td><td class="result"> ${this.formatZeroResult(
        deathsArr[i].NewDeaths
      )} </td></tr>
    `;
    }
    topDeathsText += `</table>`;
    articleTopDeaths.innerHTML = topDeathsText;
    this.topDeathsDiv.appendChild(articleTopDeaths);
  };

  printRecovered = (data) => {
    //Change it if change the API to rapid API

    // BLOCK TO SWITCH  /////
    // const dataArr = data.country_statistics;
    // let fetchDate = data.last_date_updated.slice(0, 10);
    // let fetchHour = data.last_date_updated.slice(11, 19);
    // const recoveredArr = [...dataArr];
    // recoveredArr.sort((a, b) => {
    //   return b.recovered - a.recovered;
    // });
    //Sort by New Confirmed
    const dataArr = data.Countries;
    let fetchDate = data.Date.slice(0, 10);
    let fetchHour = data.Date.slice(11, 19);
    const recoveredArr = [...dataArr];
    recoveredArr.sort((a, b) => {
      return b.NewRecovered - a.NewRecovered;
    });
    ///// END BLOCK TO CHANGE////

    let topRecoveredText = "";
    this.topRecoveredDiv.innerHTML = "";
    const articleTopRecovered = document.createElement("table");
    topRecoveredText += `<table>`;
    topRecoveredText += `<tr><th colspan="3"><h3>Top 10 recovered cases</h3><br>`;
    topRecoveredText += `
        <h6>Last update :  ${fetchDate} - ${fetchHour}</h6>
        </th></tr>
    `;

    for (let i = 0; i < 10; i++) {
      /// BLOCK TO SWITCH ////
      //     topRecoveredText += `

      //     <tr><td><img src="${
      //       recoveredArr[i].flag
      //     }" class="flag"></td><td class="result">${
      //     recoveredArr[i].country
      //   } :</td><td class="result"> ${this.formatZeroResult(
      //     recoveredArr[i].recovered
      //   )} </td></tr>
      //   `;
      // }
      ///// END BLOCK TO SWITCH ////
      topRecoveredText += `
      <tr><td><img src="https://www.countryflags.io/${
        recoveredArr[i].CountryCode
      }/flat/64.png" class="flag"></td><td class="result">${
        recoveredArr[i].Country
      } :</td><td class="result"> ${this.formatZeroResult(
        recoveredArr[i].NewRecovered
      )} </td></tr>
    `;
    }
    topRecoveredText += `</table>`;
    articleTopRecovered.innerHTML = topRecoveredText;
    this.topRecoveredDiv.appendChild(articleTopRecovered);
  };

  printCountriesDropDown = (data) => {
    //Change it if change the API to rapid API

    // BLOCK TO SWITCH  /////
    // const dataArr = data.country_statistics;
    // let fetchDate = data.last_date_updated.slice(0, 10);
    // let fetchHour = data.last_date_updated.slice(11, 19);
    // const listCountriesArr = [...dataArr];

    //Sort by New Confirmed
    const dataArr = data.Countries;
    let fetchDate = data.Date.slice(0, 10);
    let fetchHour = data.Date.slice(11, 19);
    const listCountriesArr = [...dataArr];

    ///// END BLOCK TO CHANGE////

    // Create Countries array for later use
    let countriesArr = [];
    for (let i = 0; i < listCountriesArr.length; i++) {
      countriesArr.push(listCountriesArr[i].Country);
    }
    const dropdownDiv = document.createElement("div");
    dropdownDiv.classList.add("dropdowndiv");
    let dropDownHTML = `<p>Select a country to display</p>`;
    dropDownHTML += `<select name="countries" id="countries" class="select-css">`;
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
      //Change it if change the API to rapid API

      // BLOCK TO SWITCH  /////
      // const dataArr = data.country_statistics;
      // let fetchDate = data.last_date_updated.slice(0, 10);
      // let fetchHour = data.last_date_updated.slice(11, 19);
      // const countriesArr = [...dataArr];
      // recoveredArr.sort((a, b) => {
      //   return b.recovered - a.recovered;
      // });
      //Sort by New Confirmed
      const dataArr = data.Countries;
      const countriesArr = [...dataArr];
      let fetchDate = data.Date.slice(0, 10);
      let fetchHour = data.Date.slice(11, 19);
      const recoveredArr = [...dataArr];
      recoveredArr.sort((a, b) => {
        return b.NewRecovered - a.NewRecovered;
      });
      ///// END BLOCK TO CHANGE////

      let divCountryDetail = document.querySelector(".countrydetail");
      if (!divCountryDetail) {
        divCountryDetail = document.createElement("div");
      }
      divCountryDetail.innerHTML = "";
      divCountryDetail.classList.add("countrydetail");
      if (country === "") {
        countryDetailText = "NO COUNTRY PASSED";
      } else {
        for (let i = 0; i < countriesArr.length; i++) {
          // Creeating the div content to show detail

          if (countriesArr[i].Country == country) {
            //// BLOCK TO SWITCH //
            //     countryDetailText = `<table>
            //     <thead>
            //       <tr>
            //       <th width="100px"><img src="${countriesArr[i].flag}" class="flag"></th>
            //       <th colspan="2" class="result"><h3>${countriesArr[i].country} cases</h3></th>
            //     </tr>
            //     </thead>`;
            //     countryDetailText += `
            //   <tr>
            //     <td colspan="3" class="result"><h4>Fetch date :  ${fetchDate} - ${fetchHour}</h4><td>
            //   </tr>
            //   <tr><td class="result">active</td><td></td><td class="result aligncell">${this.formatZeroResult(
            //     countriesArr[i].active
            //   )}</td></tr>
            //   <tr><td class="result">confirmed</td><td></td><td class="result aligncell">${this.formatZeroResult(
            //     countriesArr[i].confirmed
            //   )}</td></tr>
            //   <tr><td class="result">deaths</td><td></td><td class="result aligncell">${this.formatZeroResult(
            //     countriesArr[i].deaths
            //   )}</td></tr>
            //   <tr><td class="result">recovered</td><td></td><td class="result aligncell">${this.formatZeroResult(
            //     countriesArr[i].recovered
            //   )}</td></tr>
            // `;
            countryDetailText = `<table>
        <thead>
          <tr>
          <th colspan="3" class="result">
            <table>
              <tr>
                <td><img src="https://www.countryflags.io/${countriesArr[i].CountryCode}/flat/64.png" class="flag"></td>
                <td class="result"><h4>${countriesArr[i].Country}</h4></td>
              </tr>
            </table>
          </th>
        </tr>
        </thead>`;
            countryDetailText += `
      <tr>
        <td colspan="3" class="result"><h6>Fetch date :  ${fetchDate} - ${fetchHour}</h6><td>
      </tr>
      <tr><td class="result">New Confirmed</td><td></td><td class="result aligncell">${this.formatZeroResult(
        countriesArr[i].NewConfirmed
      )}</td></tr>          
      <tr><td class="result">New Deaths</td><td></td><td class="result aligncell">${this.formatZeroResult(
        countriesArr[i].NewDeaths
      )}</td></tr>
      <tr><td class="result">New Recovered</td><td></td><td class="result aligncell">${this.formatZeroResult(
        countriesArr[i].NewRecovered
      )}</td></tr>
      <tr><td clospan="2"><hr></td></tr>
      <tr><td class="result">Total Confirmed</td><td></td><td class="result aligncell">${this.formatZeroResult(
        countriesArr[i].TotalConfirmed
      )}</td></tr>
      <tr><td class="result">Total Deaths</td><td></td><td class="result aligncell">${this.formatZeroResult(
        countriesArr[i].TotalDeaths
      )}</td></tr>
      <tr><td class="result">Total Recovered</td><td></td><td class="result aligncell">${this.formatZeroResult(
        countriesArr[i].TotalRecovered
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
