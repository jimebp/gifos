function swapStyleSheetToDark() {
  document.getElementById("theme").setAttribute('href', "styles/dark.css")
  document.getElementById("logo_img").src = "img/gifOF_logo_dark.png"
}


function swapStyleSheetToLight() {
  document.getElementById("theme").setAttribute('href', "styles/styles.css")
}
