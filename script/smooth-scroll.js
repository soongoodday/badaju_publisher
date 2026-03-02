document.addEventListener("DOMContentLoaded", function(){

const items = document.querySelectorAll(".on-screen");

const observer = new IntersectionObserver(function(entries){

entries.forEach(function(entry){

if(entry.isIntersecting){
entry.target.classList.add("show");
}
else{
entry.target.classList.remove("show");
}

});

},{
threshold:0.15
});

items.forEach(function(item){
observer.observe(item);
});

});




