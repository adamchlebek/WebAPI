import axios, {AxiosResponse} from "axios";

let teamsInput: HTMLInputElement | null;
let searchInput: HTMLInputElement | null;

let addTeamInput: HTMLButtonElement | null;
let searchPlayerInput: HTMLButtonElement | null;

let successLabel: HTMLParagraphElement | null;
let errorLabel: HTMLParagraphElement | null;

teamsInput = document.querySelector("#teams");
searchInput = document.querySelector("#player");

addTeamInput = document.querySelector("#addTeam");
searchPlayerInput = document.querySelector("#searchPlayer");

successLabel = document.querySelector("#success");
errorLabel = document.querySelector("#error");

teamsInput?.addEventListener('change', () => {
  var team = teamsInput?.value;

  console.log(team);
})

axios.get('https://www.balldontlie.io/api/v1/teams').then((r: AxiosResponse) => {
  const teams = r.data.data;

  for(let t of teams) {
    let newOption = new Option(t.full_name, t.id);
    teamsInput?.appendChild(newOption);
  }
  
}).catch((error: AxiosResponse) => {
  setMessage(errorLabel, error.statusText);
});
  
searchPlayerInput?.addEventListener("click", () => {
  console.log(searchInput?.value)
  var url = `https://www.balldontlie.io/api/v1/players`;

  searchInput?.value ? url += `?search=${searchInput.value}` : url;

  axios.get(url).then((r: AxiosResponse) => {
    if(r.data.data.length == 0){
      setMessage(errorLabel, 'No player with that name.');
      return;
    }

    var player = r.data.data[0];
    setMessage(successLabel, 'Player added to table!');

    //Add player info to table here
  }).catch((error: AxiosResponse) => {
    setMessage(errorLabel, error.statusText);
  });
});

addTeamInput?.addEventListener("click", () => {
  var selectedTeam = teamsInput?.value;

  axios.get(`https://www.balldontlie.io/api/v1/teams/${selectedTeam}`).then((r: AxiosResponse) => {
    setMessage(successLabel, 'Team added to table!');

    //Add Info to Table
  }).catch((error: AxiosResponse) => {
    setMessage(errorLabel, error.statusText);
  })
})

function setMessage(element: any, text: string) {
  showLabel(element);
  setText(element, text);
  setTimeout(() => {
    hideLabel(element);
  }, 4000); 
}

function showLabel(element: any) {
  element?.classList.remove('hide');
  element?.classList.add('show');
}

function hideLabel(element: any) {
  element?.classList.remove('show');
  element?.classList.add('hide');
}

function setText(element: any, text: string) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  element?.appendChild(document.createTextNode(text));
}

//http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/#{abbreviation}.png
