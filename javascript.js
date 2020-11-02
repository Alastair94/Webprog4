var collapseBtn = document.getElementById('collapseBtn');
var sidenav = document.getElementById('sidenav');
var main = document.getElementById('main');
var angle = document.getElementById('angle');
var headline = document.getElementById('headline');
var formControlRange = document.getElementById('formControlRange');
var probability = document.getElementById('probability');

var orgLabel = [];
var orgSpecLabel = [];
var recLabel = [];
var recSpecLabel = [];
var beginning = 0;
var list;

collapseBtn.addEventListener('click', function(){
	sidenav.classList.toggle('active');
	main.classList.toggle('active');
	if(angle.classList.contains("fa-angle-left")){
		angle.classList.toggle("fa-angle-left", false);
		angle.classList.toggle("fa-angle-right", true);
	}
	else{
		angle.classList.toggle("fa-angle-left", true);
		angle.classList.toggle("fa-angle-right", false);
	}
});

function fetchFile(){
	list = [];
	fetch("data.txt")
		.then(res => res.text())
		.then(content => content.split('\n'))
		.then(lines => lines.map((part) => part.split('$$$')))
		.then(splits => {
			var index = 0;
			splits.forEach(part => {
				var data = {};
				data.ID = index++;
				data.recLabel = part[0];
				data.recSpecLabel = part[1];
				data.orgLabel = part[2];
				data.headline = part[3];
				data.content = part[4];
				list.push(data);				
			});
			headline.innerHTML = "";
			list.map((data, index) => {
				if(index >= beginning && index < beginning + 20){
					var dropdown = document.createElement('OPTION');
					dropdown.innerText = data.headline;
					dropdown.value = data.headline;
					headline.appendChild(dropdown);
				}
			})
		});
};

fetchFile();

formControlRange.addEventListener('input', e =>{
	probability.innerHTML = e.target.value;
})