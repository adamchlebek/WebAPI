import axios, {AxiosResponse} from "axios";

let teamsInput: HTMLInputElement | null;
let searchInput: HTMLInputElement | null;

let addTeamInput: HTMLButtonElement | null;
let searchPlayerInput: HTMLButtonElement | null;

let successLabel: HTMLParagraphElement | null;
let errorLabel: HTMLParagraphElement | null;

let playerTable: HTMLTableElement | null;
let teamsTable: HTMLTableElement | null;

let clearButton: HTMLButtonElement | null;

teamsInput = document.querySelector("#teams");
searchInput = document.querySelector("#player");

addTeamInput = document.querySelector("#addTeam");
searchPlayerInput = document.querySelector("#searchPlayer");

successLabel = document.querySelector("#success");
errorLabel = document.querySelector("#error");

playerTable = document.querySelector("#playersTable");
teamsTable = document.querySelector("#teamsTable");

clearButton = document.querySelector("#clear");

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
    console.log(player)
    setMessage(successLabel, 'Player added to table!');

    //Add player info to table here
    var tableBody = playerTable?.getElementsByTagName("tbody")[0];
    var row = tableBody?.insertRow();
    var playerImage = document.createElement('img');
    playerImage.src = `https://nba-players.herokuapp.com/players/${player.last_name}/${player.first_name}`;
    playerImage.classList.add("tableImage");

    row?.insertCell().appendChild(document.createTextNode(player.id));
    row?.insertCell().appendChild(playerImage);
    row?.insertCell().appendChild(document.createTextNode(`${player.first_name} ${player.last_name}`));
    row?.insertCell().appendChild(document.createTextNode(player.position));
    row?.insertCell().appendChild(document.createTextNode(player.height_feet ? `${player.height_feet}' ${player.height_inches}"` : 'N/A'));
  }).catch((error: AxiosResponse) => {
    setMessage(errorLabel, error.statusText);
  });
});

addTeamInput?.addEventListener("click", () => {
  var selectedTeam = teamsInput?.value;

  axios.get(`https://www.balldontlie.io/api/v1/teams/${selectedTeam}`).then((r: AxiosResponse) => {
    var team: any = r.data;

    setMessage(successLabel, 'Team added to table!');

    //Add Info to Table
    var tableBody = teamsTable?.getElementsByTagName("tbody")[0];
    var row = tableBody?.insertRow();
    var teamIcon = document.createElement('img');
    teamIcon.src = `https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/${team.abbreviation.toLowerCase()}.png`;
    teamIcon.classList.add("tableImage");

    row?.insertCell().appendChild(document.createTextNode(team.id));
    row?.insertCell().appendChild(teamIcon);
    row?.insertCell().appendChild(document.createTextNode(team.name));
    row?.insertCell().appendChild(document.createTextNode(team.abbreviation));
    row?.insertCell().appendChild(document.createTextNode(team.conference));

  }).catch((error: AxiosResponse) => {
    setMessage(errorLabel, error.statusText);
  })
})

clearButton?.addEventListener("click", () => {
  removeChildNodes(teamsTable?.getElementsByTagName("tbody")[0]);
  removeChildNodes(playerTable?.getElementsByTagName("tbody")[0]);

  setMessage(successLabel, 'Tables successfully cleared!');
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
  removeChildNodes(element);

  element?.appendChild(document.createTextNode(text));
}

function removeChildNodes(element: any) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

//http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/#{abbreviation}.png
