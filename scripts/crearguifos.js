document.addEventListener("DOMContentLoaded", async () => {

  const button_capture = document.getElementById("capturar_button")
  const button_camera = document.getElementById("button_cam")
  const video_container = document.getElementById("video_record_container")
  const button_ready = document.getElementById("button_ready")
  const button_clock = document.getElementById("button_clock")
  const input_ready = document.getElementById("input_ready")
  const button_container2 = document.getElementById("contenedorboton")
  const button_container_repeat = document.getElementById("button_container_repeat")
  const button_repeat = document.getElementById("repetirCaptura")
  const button_upload = document.getElementById("subirGifo")
  const container_img_info = document.getElementById("container_video")
  const pop_up3 = document.getElementById("subiendo_gif");
  const instrucciones = document.getElementById("instrucciones");
  const last_container = document.getElementById('ultimo_paso');
  const guifo_creado = document.getElementsByClassName('crear_guifos_3');
  const loading_bar = document.querySelector('.barra_carga');
  const forward = document.querySelector('.forward');
  const cronometro2 = document.querySelector('.cronometro2');
  const crear_container = document.querySelector("#precaptura");
  const mis_guifos_container = document.getElementById('mis_guifos_container')
  const mis_guifos_section = document.getElementById("mis_guifos_section")
  let recorder = null
  let blob = null

  const captura = document.getElementById("captura")
  const img = document.createElement('img')
  const api_url = 'https://api.giphy.com/v1/gifs'
  const api_key = 'aRFdVVcA243uTM48EGTq4VH02DzZAtht'
  const endpoints = {
    upload: `https://upload.giphy.com/v1/gifs?api_key=${api_key}`
  }


  const getMedia = async () => {
    const config = {
      video: {
        height: {
          max: 480
        }
      },
      audio: false
    }
    let stream = null

    try {
      stream = await navigator.mediaDevices.getUserMedia(config)
      return stream
    } catch (err) {
      return 'Sin permisos para la cámara'
    }
  }

  const getData = async endpoint => {
    try {
      const res = await fetch(endpoint)
      const data = await res.json()
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  button_capture.addEventListener('click', async () => {
    button_container2.style.display = 'none'
    button_capture.style.display = 'none'
    input_ready.style.display = 'block'
    button_ready.style.display = 'block'
    button_clock.style.display = 'block'


    recorder = await startRecord(recorder, video_container)
  })


  const startRecord = async (recorder, container) => {
    let stream = await getMedia()
    container.srcObject = stream
    container.play()
    recorder = new RecordRTCPromisesHandler(stream, {
      type: 'gif',
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240,
      onGifRecordingStarted: function() {
        document.querySelector(".crear_titulo_2").innerHTML =
          "Capturando tu guifo";
      }
    });
    recorder.startRecording();
    return recorder;
  };

  const stopRecord = async (recorder, container) => {

    button_ready.style.display = "none"
    button_clock.style.display = "none"
    input_ready.style.display = "block"
    button_container_repeat.style.display = "flex"
    button_repeat.style.display = "block"
    button_upload.style.display = "block"
    document.querySelector(".crear_titulo_2").innerHTML = "Vista previa";

    container.pause()
    container.srcObject = null

    await recorder.stopRecording();
    let blob = await recorder.getBlob()
    preview(blob)
    return blob
  }

  button_ready.addEventListener('click', async () => {
    await stopRecord(recorder, video_container)
  })


  const upload = async (endpoints, body) => {
    try {
      const res = await fetch(endpoints, {
        method: "POST",
        mode: "cors",
        body: body
      });
      const data = await res.json();
      return data.data;
    } catch (error) {
      console.log(error);
    }
  };


  const preview = blob => {
    video_container.style.display = 'none'
    img.src = URL.createObjectURL(blob)
    img.setAttribute("width", "832")
    img.setAttribute("height", "434")
    container_img_info.appendChild(img)
  }

  button_repeat.addEventListener("click", async () => {
    img.src = URL.revokeObjectURL(blob)
    button_repeat.style.display = "none";
    button_upload.style.display = "none";
    button_ready.style.display = "block";
    video_container.style.display = "block";
    button_clock.style.display = "block"
    input_ready.style.display = "block"
    img.style.display = "none";

    recorder = await startRecord(recorder, video_container);
  })

  const renderMyGifs = gifs => {
    let container = document.querySelector("#mis_guifos_container");

    if (Array.isArray(gifs)) {
      for (let gif of gifs) {
        let img = document.createElement("img");
        img.setAttribute("width", "270");
        img.setAttribute("height", "270");
        img.src = gif.images.downsized.url;
        img.alt = gif.title;
        container.appendChild(img);
      }
    } else {
      let img = document.createElement("img");
      img.setAttribute("width", "270");
      img.setAttribute("height", "270");
      img.src = gifs.images.downsized.url;
      img.alt = gifs.title;
      container.appendChild(img);
    }
  }

  const myGifs = JSON.parse(localStorage.getItem("myGifs")) || [];
  localStorage.setItem("myGifs", JSON.stringify(myGifs));
  const gifs = await getData(`${api_url}?api_key=${api_key}&ids=${myGifs}`);
  renderMyGifs(gifs)


  button_upload.addEventListener("click", async () => {
    pop_up3.style.display = "block";
    button_capture.style.display = "none";
    crear_container.style.display = "none";
    let blob = await recorder.getBlob();
    let response = await sendGif(blob);
    const gif = await getData(`${api_url}/${response.id}?api_key=${api_key}`);
    renderLastGif(gif);
    pop_up3.style.display = "none";
    last_container.style.display = "block";
    guifo_creado.style.display = "block";
  })

  const renderLastGif = gif => {
    let container = document.querySelector("#gifoOk");
    let img = document.createElement("img");
    img.setAttribute("width", "365");
    img.setAttribute("height", "191");
    img.setAttribute("style", "opacity: 0.3");
    img.src = gif.images.downsized.url;
    img.alt = gif.title;
    container.appendChild(img);
  }

  const copy_paste = document.querySelector('.button_copy')

  copy_paste.addEventListener("click", async () => {
    let input = document.createElement("input");
    let blob = await recorder.getBlob();
    const blobUrl = URL.createObjectURL(blob);
    input.setAttribute("value", blobUrl);
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  })

  const sendGif = async blob => {
    const form = new FormData();
    form.append("file", blob, "myGifs.gif");
    console.log(form.get("file"));
    const response = await upload(endpoints.upload, form);
    const actualGifs = JSON.parse(localStorage.getItem("myGifs")) || [];
    console.log(actualGifs);
    const newGifs = [...actualGifs, response.id];
    console.log(newGifs);
    localStorage.setItem("myGifs", JSON.stringify(newGifs));
    const gif = await getData(`${api_url}?api_key=${api_key}&ids=${newGifs}`);
    renderMyGifs(gif);
    return response;
  }

  const source = (imgId, gifId) => {
    document.getElementById(imgId).src = 'https://i.giphy.com/media/' + gifId + '/giphy.webp'
  }

  const getId = async (endpoint, imgId) => {
    try {
      const res = await fetch(endpoint)
      const data = await res.json()
      return source(imgId, data.data.id)
    } catch (error) {
      console.log(error)
    }
  }
})
