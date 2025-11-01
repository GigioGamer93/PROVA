const team = [
  {name:"Alisson", position:"GK"},
  {name:"Robertson", position:"LB"},
  {name:"Varane", position:"CB"},
  {name:"Alaba", position:"CB"},
  {name:"De Bruyne", position:"CM"},
  {name:"Verratti", position:"CM"},
  {name:"Modric", position:"CM"},
  {name:"Messi", position:"RW"},
  {name:"Neymar", position:"LW"},
  {name:"Haaland", position:"ST"},
  {name:"Ronaldo", position:"ST"}
];

let dragged = null;

function getFormationLayout(formation) {
  switch(formation) {
    case "4-4-2":
      return [
        {x:50,y:90},
        {x:20,y:70},{x:40,y:70},{x:60,y:70},{x:80,y:70},
        {x:20,y:50},{x:40,y:50},{x:60,y:50},{x:80,y:50},
        {x:35,y:30},{x:65,y:30}
      ];
    case "4-3-3":
      return [
        {x:50,y:90},
        {x:20,y:70},{x:40,y:70},{x:60,y:70},{x:80,y:70},
        {x:30,y:50},{x:50,y:50},{x:70,y:50},
        {x:20,y:30},{x:50,y:25},{x:80,y:30}
      ];
    case "3-5-2":
      return [
        {x:50,y:90},
        {x:25,y:70},{x:50,y:70},{x:75,y:70},
        {x:10,y:50},{x:30,y:50},{x:50,y:50},{x:70,y:50},{x:90,y:50},
        {x:35,y:30},{x:65,y:30}
      ];
    default:
      return [];
  }
}

function drawFormation() {
  const formation = document.getElementById("formation").value;
  const layout = getFormationLayout(formation);
  const field = document.getElementById("formationField");
  field.innerHTML = "";

  layout.forEach((pos,i)=>{
    const player = team[i] || {name:"-", position:""};
    const div = document.createElement("div");
    div.classList.add("player-dot");
    div.draggable = true;
    div.dataset.index = i;
    div.style.left = pos.x + "%";
    div.style.top = pos.y + "%";
    div.innerHTML = `${player.name}<br>${player.position}`;

    div.addEventListener("dragstart", dragStart);
    div.addEventListener("dragend", dragEnd);

    field.appendChild(div);
  });

  field.addEventListener("dragover", dragOver);
  field.addEventListener("drop", dropPlayer);
}

function dragStart(e){
  dragged = e.target;
  e.target.style.opacity="0.6";
  e.target.classList.add("highlight");
}
function dragEnd(e){
  e.target.style.opacity="1";
  e.target.classList.remove("highlight");
}
function dragOver(e){ e.preventDefault(); }
function dropPlayer(e){
  e.preventDefault();
  if(!dragged) return;
  const field = e.currentTarget;
  const rect = field.getBoundingClientRect();
  const x = ((e.clientX-rect.left)/rect.width)*100;
  const y = ((e.clientY-rect.top)/rect.height)*100;

  const formation = document.getElementById("formation").value;
  const layout = getFormationLayout(formation);
  let closest = layout[0];
  let minDist = Number.MAX_VALUE;
  layout.forEach(pos=>{
    const dist = Math.hypot(pos.x-x,pos.y-y);
    if(dist<minDist){minDist=dist; closest=pos;}
  });

  dragged.style.left = closest.x + "%";
  dragged.style.top = closest.y + "%";
}

function resetFormation(){
  drawFormation();
}

document.getElementById("formation").addEventListener("change", drawFormation);
document.getElementById("resetBtn").addEventListener("click", resetFormation);

window.onload = drawFormation;
