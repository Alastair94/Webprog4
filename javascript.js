var collapseBtn = document.getElementById('collapseBtn');
var sidenav = document.getElementById('sidenav');
var angle = document.getElementById('angle');

collapseBtn.addEventListener('click', function(){
	sidenav.classList.toggle('active');
	if(angle.classList.contains("fa-angle-left")){
		angle.classList.toggle("fa-angle-left", false);
		angle.classList.toggle("fa-angle-right", true);
	}
	else{
		angle.classList.toggle("fa-angle-left", true);
		angle.classList.toggle("fa-angle-right", false);
	}
});