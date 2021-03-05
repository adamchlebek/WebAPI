import axios, {AxiosResponse} from "axios";

var fbiURL = "https://api.fbi.gov/@wanted?pageSize=20sort_on=modified&sort_order=desc";
const headers = {
  'Content-Type': 'application/json',
  "Access-Control-Allow-Origin": "*"
};

let fieldOffice: HTMLInputElement | null;
let statusInput: HTMLInputElement | null;
let theButton: HTMLButtonElement | null;

statusInput = document.querySelector("#userInput > select");
fieldOffice = document.querySelector("#userInput > input[type=text]");
theButton = document.querySelector("#userInput > button");
  
theButton?.addEventListener("click", () => {
  //Check if numberInput contains a number that isn't 0
  const statusValue = statusInput?.value ?? null;
  const fieldOfficeValue = fieldOffice?.value ?? null;

  statusValue ? fbiURL += `&status=${statusValue}` : fbiURL;
  fieldOfficeValue ? fbiURL += `&field_offices=${fieldOfficeValue}` : fbiURL;

  axios.get(fbiURL, { headers })
    .then((r: AxiosResponse) => {
      console.log(r.data)
    })
    .then((people) => {
      console.log(people)
    })
});