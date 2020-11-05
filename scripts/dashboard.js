"use strict";

const fetcher = new Fetcher();
const printData = new PrintData();

const data = fetcher.getFetchData();

fetcher.getFetchData().then((data) => {
  //THIS IS FOR THE API19 API
  //printData.printActiveSorted(data);
  //THIS IS FOR THE RAPIDAPI
  printData.printTotalConfirmed(data);
  //
  printData.printConfirmedSorted(data);
  printData.printDeathsSorted(data);
  printData.printRecovered(data);
  printData.printCountriesDropDown(data);
});
