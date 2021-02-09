// const searchSongs = async() =>{
//     document.getElementById('song-container').innerHTML = '';
//     document.getElementById('song-lyrics').innerHTML = '';
//     const searchItem = document.getElementById('search-field').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchItem}`;
//     const res= await fetch(url);
//     const data = await res.json();
//     showSong(data.data);
// }
const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    // load data
        fetch(url)
        .then(res => res.json())
        .then(data => showSong(data.data))
        .catch(error => displayError('Something Went Wrong!!Please Try Again Later!!'));
}

const showSong = songs =>{
    if(songs.title == null){
        const alertContainer = document.getElementById('alert');
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert';
        const alertMessage = `
            <p class="alertMessage"> OOPS! Song Not FOund </p>
        `;
        alertDiv.innerHTML = alertMessage;
        alertContainer.appendChild(alertDiv);
    }
    else{
        const songContainer = document.getElementById('song-container');
        songs.forEach(song => {
            const songDiv = document.createElement('div');
            songDiv.className = "single-result row align-items-center my-3 p-3";
            songDiv.innerHTML = `
                <div class="col-md-9">
                    <h3 class="lyrics-name"> ${song.title} </h3>
                    <p class="lead-author"> Album By : <span> ${song.artist.name} </span> </p>
                    <audio controls>
                        <source src="${song.preview}" type="audio/mpeg">
                    </audio>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button class="btn btn-success" onclick="showLyrics('${song.artist.name}','${song.title}')">Get Lyrics</button>
                </div>
    
            `;
            songContainer.appendChild(songDiv);
        });
    }
}
const showLyrics = async (artist,title) =>{
    document.getElementById('song-lyrics').innerText = '';
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch (error) {
        displayError('Sorry! I failed to load lyrics, Please try again later!!!')
    }
}
const displayLyrics = lyrics =>{
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}
const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}