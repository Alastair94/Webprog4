var collapseBtn = document.getElementById('collapseBtn');
var sidenav = document.getElementById('sidenav');
var main = document.getElementById('main');
var angle = document.getElementById('angle');
var headline = document.getElementById('headline');
var formControlRange = document.getElementById('formControlRange');
var probability = document.getElementById('probability');
var btn_back_20 = document.getElementById('btn_back_20');
var btn_back = document.getElementById('btn_back');
var btn_forward = document.getElementById('btn_forward');
var btn_forward_20 = document.getElementById('btn_forward_20');
var recLabels = document.getElementById('recLabels');
var recLabelsSpec = document.getElementById('recLabelsSpec');
var orgLabels = document.getElementById('orgLabels');
var orgLabelsSpec = document.getElementById('orgLabelsSpec');


var orgLabel = [];
var orgLabelSpec = [];
var recLabel = [];
var recLabelSpec = [];
var beginning = 0;
var list = [];
var rangeValue = 0.5;
var story = "";
var caption = "";

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
				data.recLabelSpec = part[1];
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

formControlRange.addEventListener('input', e =>{
	rangeValue = e.target.value;
	probability.innerHTML = rangeValue;
	fillRecLabel(recLabel);
	fillRecLabelSpec(recLabelSpec);
	fillOrgLabel(orgLabel);
	fillOrgLabelSpec(orgLabelSpec);
})

btn_back_20.addEventListener('click', () => {
	if(beginning == 0){
		beginning = list.length - 20;
	}
	else if(beginning - 20 < 0){
		beginning = 0;
	}
	else{
		beginning = beginning - 20.
	}
	fillCards(list[beginning]);
	fetchFile();
})

btn_back.addEventListener('click', () => {
	if(beginning == 0){
		beginning = list.length - 1;
	}
	else{
		beginning = beginning - 1;
	}
	fillCards(list[beginning]);
	fetchFile();
})

btn_forward.addEventListener('click', () => {
	if(beginning == list.length - 1){
		beginning = 0;
	}
	else{
		beginning = beginning + 1;
	}
	fillCards(list[beginning]);
	fetchFile();
})

btn_forward_20.addEventListener('click', () => {
	if(beginning + 20 >= list.length){
		beginning = 0;
	}
	else{
		beginning = beginning + 20;
	}
	fillCards(list[beginning]);
	fetchFile();
})

function fillCards(content){
	orgLabel = [];
	orgLabelSpec = [];
	recLabel = [];
	recLabelSpec = [];
	var tmp = {};
	var recL = content.recLabel.split(' ');
	var recLS = content.recLabelSpec.split(' ');
	var orgL = content.orgLabel.split(' ');
	story = content.content;
	caption = content.headline;
	
	recL.forEach(tags => {
		if(tags.trim().startsWith('__label__')){
			tmp.label = tags.replace('__label__','').replace('@@', ' ');
		} else if(tags){
			tmp.probability = tags.trim();
			recLabel.push(tmp);
			tmp = {};
		}
	});
	
	recLS.forEach(tags => {
		if(tags.trim().startsWith('__label__')){
			tmp.label = tags.replace('__label__','').replace('@@', ' ');
		} else if(tags){
			tmp.probability = tags.trim();
			recLabelSpec.push(tmp);
			tmp = {};
		}
	});
	
	orgL.forEach(tags => {
		if(tags.trim().startsWith('__label__')){
			tmp.label = tags.replace('__label__','').replace('@@', ' ');
			orgLabel.push(tmp);
			tmp = {};
		} else if(tags){
			tmp.label = tags.replace('@@', ' ');
			orgLabelSpec.push(tmp);
			tmp = {};
		}
	});
	fillRecLabel(recLabel);
	fillRecLabelSpec(recLabelSpec);
	fillOrgLabel(orgLabel);
	fillOrgLabelSpec(orgLabelSpec);
	document.getElementById('story').innerHTML = story;
}

headline.addEventListener('change', (e) => {
	for(var i = 0; i < list.length; i++){
		if(list[i].headline == e.target.value){
			fillCards(list[i]);
			beginning = i;
			break;
		}
	}
});

function fillRecLabel(tags){
	recLabels.innerHTML = "";
	for(var i = 0; i < tags.length; i++){
		if(tags[i].probability){
			if(tags[i].probability >= rangeValue){
				var li = document.createElement('li');
				if(tags[i].label){
					li.textContent = tags[i].label + " (" + tags[i].probability + ")";
				}
				else{
					li.textContent = tags[i].probability;
				}
				recLabels.appendChild(li);
			}
		}else{
			var li = document.createElement('li');
			li.textContent = tags[i].label;
			recLabels.appendChild(li);
		}
	}
}

function fillRecLabelSpec(tags){
	recLabelsSpec.innerHTML = "";
	for(var i = 0; i < tags.length; i++){
		if(tags[i].probability){
			if(tags[i].probability >= rangeValue){
				var li = document.createElement('li');
				if(tags[i].label){
					li.textContent = tags[i].label + " (" + tags[i].probability + ")";
				}
				else{
					li.textContent = tags[i].probability;
				}
				recLabelsSpec.appendChild(li);
			}
		}else{
			var li = document.createElement('li');
			li.textContent = tags[i].label;
			recLabelsSpec.appendChild(li);
		}
	}
}

function fillOrgLabel(tags){
	orgLabels.innerHTML = "";
	for(var i = 0; i < tags.length; i++){
		if(tags[i].probability){
			if(tags[i].probability >= rangeValue){
				var li = document.createElement('li');
				if(tags[i].label){
					li.textContent = tags[i].label + " (" + tags[i].probability + ")";
				}
				else{
					li.textContent = tags[i].probability;
				}
				orgLabels.appendChild(li);
			}
		}else{
			var li = document.createElement('li');
			li.textContent = tags[i].label;
			orgLabels.appendChild(li);
		}
	}
}

function fillOrgLabelSpec(tags){
	orgLabelsSpec.innerHTML = "";
	for(var i = 0; i < tags.length; i++){
		if(tags[i].probability){
			if(tags[i].probability >= rangeValue){
				var li = document.createElement('li');
				if(tags[i].label){
					li.textContent = tags[i].label + " (" + tags[i].probability + ")";
				}
				else{
					li.textContent = tags[i].probability;
				}
				orgLabelsSpec.appendChild(li);
			}
		}else{
			var li = document.createElement('li');
			li.textContent = tags[i].label;
			orgLabelsSpec.appendChild(li);
		}
	}
}



function refresh(){
	rangeValue = formControlRange.value;
	fetchFile();
}

refresh();