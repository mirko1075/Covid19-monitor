const coronaList = document.querySelector(".content-left");
const spainDetail = document.querySelector(".content-right");

fetch("https://api.covid19api.com/summary", {
  method: "GET",
  headers: {
    "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
    "x-rapidapi-key": "b71195a1a7msh5af8c981dcee164p1bf0bfjsnfb1c16ff1269",
  },
})
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    globalObj = data.Global;
    let fetchDate = data.Date.slice(0, 10);
    let fetchHour = data.Date.slice(11, 19);
    coronaList.innerHTML = "";
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
    articleCoronaText += `
                              <tr><td class="result">NewConfirmed</td><td class="result aligncell">${globalObj.NewConfirmed}</td></tr>
                              <tr><td class="result">NewDeaths</td><td class="result aligncell">${globalObj.NewDeaths}</td></tr>
                              <tr><td class="result">NewRecovered</td><td class="result aligncell">${globalObj.NewRecovered}</td></tr>
                              <tr><td class="result">NewConfirmed</td><td class="result aligncell">${globalObj.NewConfirmed}</td></tr>
                              <tr><td colspan ="2"><hr></td></tr>
                              <tr><td class="result">TotalConfirmed</td><td class="result aligncell">${globalObj.TotalConfirmed}</td></tr>
                              <tr><td class="result">TotalConfirmed</td><td class="result aligncell">${globalObj.TotalDeaths}</td></tr>
                              <tr><td class="result">TotalConfirmed</td><td class="result aligncell">${globalObj.TotalRecovered}</td></tr>
                            `;
    articleCoronaText += `
    </table>
  `;
    articleCorona.innerHTML = articleCoronaText;
    coronaList.appendChild(articleCorona);

    const spainDetailObj = data.Countries;
    // console.dir(spainDetailObj);
    spainDetail.innerHTML = "";
    const articleSpainDetail = document.createElement("article");
    let spainDetailText = `<table>
                              <thead>
                                <tr>
                                <th colspan="2" class="result"><h3>Spain cases - Updated</h3></th>
                              </tr>
                              </thead>`;

    for (i = 0; i < spainDetailObj.length; i++) {
      if (spainDetailObj[i].Country == "Spain") {
        spainDetailText += `
        <tr>
          <td colspan="2" class="result"><h4>Fetch date :  ${fetchDate} - ${fetchHour}</h4><td>
        </tr>
        
        <tr><td class="result">NewConfirmed</td><td class="result aligncell">${spainDetailObj[i].NewConfirmed}</td></tr>
        <tr><td class="result">NewDeaths</td><td class="result aligncell">${spainDetailObj[i].NewDeaths}</td></tr>
        <tr><td class="result">NewRecovered</td><td class="result aligncell">${spainDetailObj[i].NewRecovered}</td></tr>
        <tr><td class="result">NewConfirmed</td><td class="result aligncell">${spainDetailObj[i].NewConfirmed}</td></tr>
        <tr><td colspan ="2"><hr></td></tr>
        <tr><td class="result">TotalConfirmed</td><td class="result aligncell">${spainDetailObj[i].TotalConfirmed}</td></tr>
        <tr><td class="result">TotalConfirmed</td><td class="result aligncell">${spainDetailObj[i].TotalDeaths}</td></tr>
        <tr><td class="result">TotalConfirmed</td><td class="result aligncell">${spainDetailObj[i].TotalRecovered}</td></tr>
      `;
      }
    }
    spainDetailText += `
      </table>
    `;
    articleSpainDetail.innerHTML = spainDetailText;
    spainDetail.appendChild(articleSpainDetail);
  })
  .catch((error) => console.log("error", error));
