tripledot = document.querySelector('.triple-dot')
dropdownarrow = document.querySelector('.drop-down-arrow')
dislikeButton = document.querySelector('.dislike-button')
likeButton = document.querySelector('.like-button')
progressbar = document.querySelector('#progress-bar')
shufflebutton = document.querySelector('#shuffle-button')
playbutton = document.querySelector('.fa-circle-play')
repeatButton = document.querySelector('#repeat-button')
previousButton = document.querySelector('#previous-button')
nextButton = document.querySelector('#next-button')
currentAudio = document.querySelector('.current-audio')
currentTime = document.querySelector('#current-time')
totalTime = document.querySelector('#total-time')
visualizer = document.querySelector('.visualizer')
volumeBar = document.querySelector('#volume-bar')
volumeButton = document.querySelector("#volume-button")
burger = document.querySelector('.burger-container')
navigation = document.querySelector('.navigation-slider')
particlejs = document.querySelector('#particles-js')
songchooser = document.querySelector('#song-chooser')
songslists = document.querySelector('.songs-lists')
songscontainer = document.querySelector('.songs-container')
const jsmediatags = window.jsmediatags;
mediaImage = document.querySelector('.media-image')
songtitle = document.querySelector('.song-title')
totalTime = document.querySelector('#total-time')
nextMusicName = document.querySelector('#next-music-name')

// currentAudio.crossOrigin = "anonymous";

let songinterval;
let ctx;

playbutton.addEventListener("click",()=>{
    ctx.resume().then(()=>{
        if(playbutton.classList.contains('fa-circle-play')){
            playbutton.classList.remove('fa-circle-play')
            playbutton.classList.add('fa-circle-pause')
            currentAudio.play()
            songinterval = setInterval(() => {
                progressbar.value = currentAudio.currentTime
                mins = Math.trunc(currentAudio.currentTime/60)
                sec = Math.trunc(currentAudio.currentTime%60)
                currentTime.innerText = "0"+mins+":"+("0"+sec).slice(-2)
                if(currentAudio.currentTime == currentAudio.duration){
                    progressbar.value = 0
                    currentAudio.currentTime = 0
                    currentTime.innerText = "00:00"
                    clearInterval(songinterval)
                    playbutton.classList.remove('fa-circle-pause')
                    playbutton.classList.add('fa-circle-play')
                }
            }, 1000);
        }else{
            playbutton.classList.remove('fa-circle-pause')
            playbutton.classList.add('fa-circle-play')
            currentAudio.pause()
            clearInterval(songinterval)
        }
    })
})

progressbar.onchange= () =>{
    currentAudio.currentTime = progressbar.value
    mins = Math.trunc(currentAudio.currentTime/60)
    sec = Math.trunc(currentAudio.currentTime%60)
    currentTime.innerText = "0"+mins+":"+("0"+sec).slice(-2)
}


shufflebutton.addEventListener("click",()=>{
    if(shufflebutton.childNodes[3].style.opacity==0){
        shufflebutton.childNodes[3].style.opacity=0.8
    }else{
        shufflebutton.childNodes[3].style.opacity=0
    }
})

likeButton.addEventListener('click',()=>{
    if(likeButton.childNodes[1].classList.contains('fa-regular')){
        likeButton.childNodes[1].classList.remove('fa-regular')
        likeButton.childNodes[1].classList.add('fa-solid')
        if(dislikeButton.childNodes[1].classList.contains('fa-solid')){
            dislikeButton.childNodes[1].classList.remove('fa-solid')
            dislikeButton.childNodes[1].classList.add('fa-regular')
        }
    }else{
        likeButton.childNodes[1].classList.remove('fa-solid')
        likeButton.childNodes[1].classList.add('fa-regular')
    }
})

dislikeButton.addEventListener('click',()=>{
    if(dislikeButton.childNodes[1].classList.contains('fa-regular')){
        dislikeButton.childNodes[1].classList.remove('fa-regular')
        dislikeButton.childNodes[1].classList.add('fa-solid')
        if(likeButton.childNodes[1].classList.contains('fa-solid')){
            likeButton.childNodes[1].classList.remove('fa-solid')
            likeButton.childNodes[1].classList.add('fa-regular')
        }
    }else{
        dislikeButton.childNodes[1].classList.remove('fa-solid')
        dislikeButton.childNodes[1].classList.add('fa-regular')
    }
})


let repeatInt = 1
repeatButton.addEventListener('click',()=>{
    if(repeatButton.childNodes[3].style.cssText==''){
        repeatButton.childNodes[3].style.backgroundColor = 'rgba(128,128,128,0.8)'
        currentAudio.loop = true
        repeatInt = 2
    }else if(repeatButton.childNodes[3].style.cssText=='background-color: rgba(128, 128, 128, 0.8);'){
        repeatButton.childNodes[3].childNodes[0].style.opacity=1
        repeatButton.childNodes[3].style.backgroundColor = 'transparent'
        repeatInt = 3
    }else{
        repeatButton.childNodes[3].childNodes[0].style.opacity = 0
        repeatButton.childNodes[3].style.backgroundColor = ''
        currentAudio.loop = false
        repeatInt = 1
    }
})

window.addEventListener('load',e=>{
    progressbar.max = currentAudio.duration;
    progressbar.value = currentAudio.currentTime;
})

window.addEventListener("keyup",e=>{
    if(e.code=="Space"){
        ctx.resume().then(()=>{
            if(playbutton.classList.contains('fa-circle-play')){
                playbutton.classList.remove('fa-circle-play')
                playbutton.classList.add('fa-circle-pause')
                currentAudio.play()
                songinterval = setInterval(() => {
                    progressbar.value = currentAudio.currentTime
                    mins = Math.trunc(currentAudio.currentTime/60)
                    sec = Math.trunc(currentAudio.currentTime%60)
                    currentTime.innerText = "0"+mins+":"+("0"+sec).slice(-2)
                    if(currentAudio.currentTime == currentAudio.duration){
                        progressbar.value = 0
                        currentAudio.currentTime = 0
                        currentTime.innerText = "00:00"
                        clearInterval(songinterval)
                        playbutton.classList.remove('fa-circle-pause')
                        playbutton.classList.add('fa-circle-play')
                    }
                }, 1000);
            }else{
                playbutton.classList.remove('fa-circle-pause')
                playbutton.classList.add('fa-circle-play')
                currentAudio.pause()
                clearInterval(songinterval)
            }
        })
    }
})

window.addEventListener('load',()=>{
    window.AudioContext = window.AudioContext || window.webkitAudioContext

    ctx = new window.AudioContext()
    const analyser = ctx.createAnalyser()

    const source = ctx.createMediaElementSource(currentAudio)
    source.connect(analyser)
    source.connect(ctx.destination)
    analyser.fftSize = 64
    const bufferLength = analyser.frequencyBinCount

    let dataArray = new Uint8Array(bufferLength)
    let elements = []
    for( let i=0;i<bufferLength;i++){
        const element = document.createElement('span')
        element.classList.add('element')
        elements.push(element)
        visualizer.appendChild(element)
    }

    const clamp = (num, min, max) => {
        if(num >= max) return max;
        if(num <= min) return min;
        return num;
    }

    const update = () =>{
        requestAnimationFrame(update)
        analyser.getByteFrequencyData(dataArray)
        for (let i = 0; i < bufferLength; i++) {
            let item = dataArray[i];
            item = item > 150 ? item / 1.5 : item * 1.5;
            elements[i].style.transform = `rotateZ(${i * (360 / bufferLength)}deg) translate(-50%, ${clamp(item, 73, 107.5)}px)`;
        }
    }
    update()
})

volumeBar.addEventListener('input',()=>{
    if(volumeBar.value/100 < 0.5){
        volumeButton.childNodes[1].classList.remove('fa-volume-off')
        volumeButton.childNodes[1].classList.remove('fa-volume-high')
        volumeButton.childNodes[1].classList.add('fa-volume-low')
    }
    if(volumeBar.value/100 > 0.5){
        volumeButton.childNodes[1].classList.remove('fa-volume-off')
        volumeButton.childNodes[1].classList.remove('fa-volume-low')
        volumeButton.childNodes[1].classList.add('fa-volume-high')
    }
    if(volumeBar.value/100 < 0.08){
        volumeButton.childNodes[1].classList.remove('fa-volume-low')
        volumeButton.childNodes[1].classList.remove('fa-volume-high')
        volumeButton.childNodes[1].classList.add('fa-volume-off')
    }
    currentAudio.volume = volumeBar.value/100
})

volumeButton.addEventListener('click',()=>{
    if(volumeButton.childNodes[1].classList.contains('fa-volume-xmark')){
        volumeButton.childNodes[1].classList.remove('fa-volume-xmark')
        volumeButton.childNodes[1].classList.add('fa-volume-off')
        currentAudio.volume = 0.07
        volumeBar.value = 7
    }else{
        volumeButton.childNodes[1].classList.remove('fa-volume-low')
        volumeButton.childNodes[1].classList.remove('fa-volume-high')
        volumeButton.childNodes[1].classList.remove('fa-volume-off')
        volumeButton.childNodes[1].classList.add('fa-volume-xmark')
        volumeBar.value = 0
        currentAudio.volume = 0
    }
})

burger.addEventListener('click',()=>{
    burger.childNodes[1].classList.toggle('open')
    navigation.classList.toggle('navigation-open')
    particlejs.classList.toggle('particles-js-blur')
})

songchooser.addEventListener('change',e=>{
    while(songscontainer.hasChildNodes()){
        songscontainer.removeChild(songscontainer.firstChild)
    }
    for(i=0;i<songchooser.files.length;i++){
        
        const currentFile = songchooser.files[i];
        jsmediatags.read(currentFile,{
            onSuccess: function(tag){

                imgContainer = document.createElement('img')
                imgContainer.classList.add('img-container')
                if(tag.tags.picture==null){
                    imgContainer.style.backgroundImage = 'url(./dist/musiclogo.jpg)'
                }else{
                    const data = tag.tags.picture.data
                    const format = tag.tags.picture.format
                    let base64String = ""
                    for(let i=0;i<data.length;i++){
                        base64String += String.fromCharCode(data[i])
                    }imgContainer.style.backgroundImage = `url(data:${format};base64,${window.btoa(base64String)})`
                }

                var songName = document.createElement('div')
                songName.classList.add('song-name')
                if(tag.tags.title == null){
                    songName.innerText = 'Media'
                }else{
                    songName.innerText = (tag.tags.title).slice(0,65)
                }

                var audioTrack = document.createElement('audio')
                audioTrack.classList.add('audio-track')
                audioTrack.src = URL.createObjectURL(currentFile)

                var songContainer = document.createElement('div')
                songContainer.classList.add('song-container')
                songContainer.appendChild(imgContainer)
                songContainer.appendChild(songName)
                songContainer.appendChild(audioTrack)

                songscontainer.appendChild(songContainer)

                nextMusicName.innerText = "Songs Selected"

            },
            onError: function(error){
                console.log(error)
            }
        }) 
    }
})

count = 0;

previousButton.addEventListener('click',()=>{
    if(currentAudio.currentTime < 2 && count!=0){
        count--
        mediaImage.style.backgroundImage = songscontainer.children[count].children[0].style.backgroundImage
        songtitle.innerText = (songscontainer.children[count].children[1].innerText).slice(0,20)
        currentAudio.src = songscontainer.childNodes[count].children[2].src
        let totalTimeDuration = songscontainer.childNodes[count].children[2].duration
        mins = Math.trunc(totalTimeDuration/60)
        sec = Math.trunc(totalTimeDuration%60)
        totalTime.innerText = "0"+mins+":"+("0"+sec).slice(-2)
        progressbar.max = totalTimeDuration
        playbutton.click()

        playbutton.classList.remove('fa-circle-play')
        playbutton.classList.add('fa-circle-pause')
        progressbar.value = 0
        currentAudio.value = 0
        currentTime.innerText = "00:00"
    }else{
        currentAudio.currentTime = 0
        progressbar.value = 0
        mins = Math.trunc(currentAudio.currentTime/60)
        sec = Math.trunc(currentAudio.currentTime%60)
        currentTime.innerText = "0"+mins+":"+("0"+sec).slice(-2)
    }

    likeButton.childNodes[1].classList.remove('fa-solid')
    likeButton.childNodes[1].classList.add('fa-regular')
    dislikeButton.childNodes[1].classList.remove('fa-solid')
    dislikeButton.childNodes[1].classList.add('fa-regular')

    nextMusicName.innerText = "UP NEXT : "+(songscontainer.children[count+1].children[1].innerText).slice(0,20)
})


nextButton.addEventListener('click',()=>{
    if(count == (songscontainer.children.length)){
        return;
    }
    mediaImage.style.backgroundImage = songscontainer.children[count].children[0].style.backgroundImage
    songtitle.innerText = (songscontainer.children[count].children[1].innerText).slice(0,20)
    currentAudio.src = songscontainer.childNodes[count].children[2].src
    let totalTimeDuration = songscontainer.childNodes[count].children[2].duration
    mins = Math.trunc(totalTimeDuration/60)
    sec = Math.trunc(totalTimeDuration%60)
    totalTime.innerText = "0"+mins+":"+("0"+sec).slice(-2)
    progressbar.max = totalTimeDuration
    playbutton.click()
    count++

    playbutton.classList.remove('fa-circle-play')
    playbutton.classList.add('fa-circle-pause')
    progressbar.value = 0
    currentAudio.value = 0
    currentTime.innerText = "00:00"

    likeButton.childNodes[1].classList.remove('fa-solid')
    likeButton.childNodes[1].classList.add('fa-regular')
    dislikeButton.childNodes[1].classList.remove('fa-solid')
    dislikeButton.childNodes[1].classList.add('fa-regular')

    nextMusicName.innerText = "UP NEXT : "+(songscontainer.children[count].children[1].innerText).slice(0,20)
})