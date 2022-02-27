const allPlayers = () =>{

    const searchValue = document.getElementById("search-feild").value ;
    if(searchValue.length == 0){
        document.getElementById('error').style.display = "display"
    }
    else{
        const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`
        fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.player))
    }
}
allPlayers()

const displayDetails = (players) => {
    // console.log(players)
        const parentDiv = document.getElementById("search-result")
        parentDiv.textContent = ""
        players.forEach(player => {
        
        const div = document.createElement("div")
        div.classList.add('col-lg-3', 'col-md-6', 'col-12')
        div.innerHTML =`
        <div class="card m-3 border-0 shadow">
        <img id="img-bg" src="${player.strThumb}" class="card-img-top" alt="there is no image of this player">
            <div class="card-body bg-dark text-white rounded-bottom">
                <h5 class="card-title">${player.strPlayer}</h5>
                <p class="card-text">
                    ☑️Nationality: ${player.strNationality}
                    <br>
                    ☑️Sport: ${player.strSport}
                    <br>
                    ☑️Gender: ${player.strGender}
                </p>
                <button onclick="popUpDetails('${player.idPlayer}')" href="#" class="btn btn-warning fw-normal fs-6" data-bs-toggle="modal" data-bs-target="#exampleModal">More info</button>
            </div>
        </div>
        `
        parentDiv.appendChild(div)
    });      
}
const popUpDetails = playerId =>{
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`
    fetch(url)
    .then(res => res.json())
    .then(data => dataModal(data.players[0]))
}

const dataModal = (info) =>{
    // console.log(info.strGender)
    const parentModal = document.getElementById("modalUp")
    const div = document.createElement("div")
    div.innerHTML = `              
        <div class="fade modal-posi modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
            <div class="card mb-3 bg-dark text-white">
            <div class="row g-0">
            <div class="col-md-4">
                <img src="${info.strCutout}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h3 class="card-title">${info.strPlayer}</h3>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
            </div>
            <button type="button" class="btn btn-warning position-absolute bottom-0 end-0 modal-Close" data-bs-dismiss="modal">Close</button>
        </div>
            </div>
        </div>
    `
    parentModal.appendChild(div)
}