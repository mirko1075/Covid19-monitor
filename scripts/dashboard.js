"use strict";

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
