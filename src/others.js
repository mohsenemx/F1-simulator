// Get the modal
var modal = document.getElementById("myModal");


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.classList.add("dx");
    setTimeout(function() {modal.style.display = "none";},350);
    
  }
}
window.onload = function() {
    modal.style.display = "flex";
};