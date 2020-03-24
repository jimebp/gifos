let asdasd = `https://api.giphy.com/v1/gifs/search?q=Jonathanvanness&api_key=aRFdVVcA243uTM48EGTq4VH02DzZAtht&limit=5"`

async function loginApi(url) {
  try {
    const rqst = await fetch(url)
    const content = await rqst.json()
    console.log(content)
    let gifURL = content.data[0].images.downsized.url
    return gifURL
  } catch (error) {
    console.log(error)
  }
}

let srcUrl = loginApi(asdasd)
srcUrl.then((respuesta) => {
  let gifContainer = document.getElementById('gif_sugerencia_1')
  let imageTag = gifContainer.appendChild(document.createElement('img'))
  imageTag.setAttribute('src', respuesta)
  imageTag.classList.add('gif_sugerencia')
})
asdasd = "https://api.giphy.com/v1/gifs/search?api_key=aRFdVVcA243uTM48EGTq4VH02DzZAtht&q=sailormercury&limit=1&offset=0&rating=G&lang=en"

srcUrl = loginApi(asdasd);
srcUrl.then((respuesta) => {
  let gifContainer = document.getElementById('gif_sugerencia_2')
  let imageTag = gifContainer.appendChild(document.createElement('img'))
  imageTag.setAttribute('src', respuesta)
  imageTag.classList.add('gif_sugerencia')
})
asdasd = "https://api.giphy.com/v1/gifs/search?api_key=aRFdVVcA243uTM48EGTq4VH02DzZAtht&q=queereye&limit=1&offset=0&rating=G&lang=en"

srcUrl = loginApi(asdasd);
srcUrl.then((respuesta) => {
  let gifContainer = document.getElementById('gif_sugerencia_3')
  let imageTag = gifContainer.appendChild(document.createElement('img'))
  imageTag.setAttribute('src', respuesta)
  imageTag.classList.add('gif_sugerencia')
})

asdasd = "https://api.giphy.com/v1/gifs/search?api_key=aRFdVVcA243uTM48EGTq4VH02DzZAtht&q=Unicorns&limit=1&offset=0&rating=G&lang=en"

srcUrl = loginApi(asdasd);
srcUrl.then((respuesta) => {
  let gifContainer = document.getElementById('gif_sugerencia_4')
  let imageTag = gifContainer.appendChild(document.createElement('img'))
  imageTag.setAttribute('src', respuesta)
  imageTag.classList.add('gif_sugerencia')
})
