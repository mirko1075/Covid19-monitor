"use strict";

const fetcher = new Fetcher();
const printData = new PrintData();

const data = fetcher.getFetchData();

fetcher.getFetchData().then((data) => {
  printData.printWorldResume(data);
  printData.printSpainResume(data);
});
