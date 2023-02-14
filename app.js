const gallery = document.querySelector('.gallery')
const formInput = document.querySelector('.form-input')
const form = document.querySelector('.search-form')
const more = document.querySelector('.more')
const submitBtn = document.querySelector('.submit-btn')
const clearInput = document.querySelector('.clear-input')
const fromDownload = document.querySelector('.from-download')
const headerDiv = document.querySelector('header')
const bodyDiv = document.querySelector('body')
// console.log(headerDiv);

const key = '89hg6Fw6r5JW1a1RvBrj4dAdpGR6TBVWVpJIywws9qCv87AciI3wNGKA'
let url = 'https://api.pexels.com/v1/curated?per_page=15&page=1'
let searchValue
let page = 1
let currentSearch
let canClick = true
// console.log(toDownload);

formInput.addEventListener('input', updateInput)
submitBtn.addEventListener('click', (e) => {
  currentSearch = searchValue
  e.preventDefault()
  // console.log(searchValue);
  if (searchValue === undefined) {
    return
  } else {
    searchPhotos(searchValue)
  }
})

more.addEventListener('click', morePhoto)

clearInput.addEventListener('click', (e) => {
  e.preventDefault()
  formInput.value = ''
})
function updateInput(e) {
  // e.preventDefault()
  searchValue = e.target.value
}

function fetchApi(url) {
  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: key,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      generatePhoto(data)
    })
}

function searchPhotos(query) {
  clear()
  fetchApi(`https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`)
}

function generateInput() {
  form.style.display = 'block'
  more.style.display = 'block'
  // console.log(form);
  headerDiv.appendChild(form)
}

function generatePhoto(fetchData) {
  //   console.log(fetchData.photos)
  fetchData.photos.forEach((photo) => {
    const photoSource = photo.src.original
    // console.log(photoSource);
    const galleyImg = document.createElement('div')

    galleyImg.classList.add('gallery-img')
    galleyImg.innerHTML = ` 
    <div class="gallery-info"> 
        <p>${photo.photographer}</p>
        <button class='download'>Photo</button>
    </div>
    <img src="${photo.src.large}"></img>`
    gallery.appendChild(galleyImg)
    let downloadBtn = galleyImg.children[0].children[1]
    // console.log(downloadBtn);
    downloadBtn.addEventListener('click', () => {
      clear()
      more.style.display = 'none'
      form.style.display = 'none'
      const singlePhotoDiv = document.createElement('div')
      singlePhotoDiv.classList.add('single-div')
      singlePhotoDiv.innerHTML = `<img src=${photoSource}></img>`
      const back = document.createElement('button')
      back.classList.add('back-btn')
      back.innerText = 'Back'
      back.addEventListener('click', () => {
        singlePhotoDiv.innerHTML = ''
        // console.log(searchValue);
        if (searchValue === undefined) {
          generateInput()
          fetchApi(url)
        } else {
          generateInput()
          searchPhotos(searchValue)
        }
      })

      singlePhotoDiv.appendChild(back)
      fromDownload.appendChild(singlePhotoDiv)
      // console.log(photoSource);
    })
  })
}

function clear() {
  gallery.innerHTML = ''
}

function morePhoto() {
  let fetchLink
  page++
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`
  }
  fetchApi(fetchLink)
}

fetchApi(url)
