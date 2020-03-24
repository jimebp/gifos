function buildingUrl() {

  tendencia = document.getElementById("tendencias_container")
  tendencia.style.display = "none"


  let result = document.getElementById("input").value
  let urlfinal = "https://api.giphy.com/v1/gifs/search?api_key=aRFdVVcA243uTM48EGTq4VH02DzZAtht&q=" + result + "&limit=12&offset=0&rating=G&lang=en"
  let searchurl = apiSearch(urlfinal)


  searchurl.then((data) => {
    const gifs = data.data
    let container = document.getElementById("search_container")
    container.innerHTML = ""


    for (let gif of gifs) {

      let div = document.createElement('div')
      div.setAttribute("class", "elementoGrillaGif")
      let img = document.createElement('img')
      let barra = document.createElement('div')
      img.src = gif.images.fixed_height.url
      img.setAttribute("width", "270")
      img.setAttribute("height", "270")
      img.setAttribute("style", "margin: 10px 0px")
      barra.classList.add("gif_tendencias_barra")

      div.appendChild(img)
      container.appendChild(div)
      div.appendChild(barra)
    }

  }).catch(err => {
    console.log(err)
  })

  async function apiSearch(url) {
    try {
      const request = await fetch(url)
      const data = await request.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }

}



