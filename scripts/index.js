const coronaList = document.querySelector(".comtent-left");
const spainDetail = document.querySelector(".comtent-right");

fetch("https://api.covid19api.com/summary", {
  method: "GET",
  headers: {
    "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
    "x-rapidapi-key": "b71195a1a7msh5af8c981dcee164p1bf0bfjsnfb1c16ff1269",
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    globalObj = data.Global;
    let fetchDate = data.Date.slice(0, 10);
    let fetchHour = data.Date.slice(11, 19);
    coronaList.innerHTML = "";
    const articleCorona = document.createElement("article");
    let articleCoronaText = ``;
    articleCoronaText += `
    <h3>World cases - Updated</h3>
      <h6>Fetch date :  ${fetchDate} - ${fetchHour}</h6>
      <hr>
    `;

    for (const property in globalObj) {
      articleCoronaText += `

      <p class="result">${property}: ${globalObj[property]}</p>
    `;
    }
    articleCoronaText += `
      <hr>
    `;
    articleCorona.innerHTML = articleCoronaText;
    coronaList.appendChild(articleCorona);

    const spainDetailObj = data.Countries;
    console.dir(spainDetailObj);
    spainDetail.innerHTML = "";
    const articleSpainDetail = document.createElement("article");
    let spainDetailText = ``;

    for (i = 0; i < spainDetailObj.length; i++) {
      console.log(spainDetailObj[i]);
      if (spainDetailObj[i].Country == "Spain") {
        spainDetailText += `
        <h3>Spain cases - Updated/h3>
        <h6>Fetch date :  ${fetchDate} - ${fetchHour}</h6>
        <hr>
        <p class="result">NewConfirmed: ${spainDetailObj[i].NewConfirmed} </p>
        <p class="result">NewDeaths: ${spainDetailObj[i].NewDeaths}</p>
        <p class="result">NewRecovered: ${spainDetailObj[i].NewRecovered}</p>
        <p class="result">NewConfirmed: ${spainDetailObj[i].NewConfirmed}</p>
        <p class="result">TotalConfirmed: ${spainDetailObj[i].TotalConfirmed}</p>
        <p class="result">TotalConfirmed: ${spainDetailObj[i].TotalDeaths}</p>
        <p class="result">TotalConfirmed: ${spainDetailObj[i].TotalRecovered}</p>
      `;
      }
    }
    spainDetailText += `
      <hr>
    `;
    articleSpainDetail.innerHTML = spainDetailText;
    spainDetail.appendChild(articleSpainDetail);
  })
  .catch((error) => console.log("error", error));
