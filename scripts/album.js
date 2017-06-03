 // Example Album
 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

var albumSangio = {
     title: 'Fate',
     artist: 'Sangiovese',
     label: 'Vino',
     year: '1945',
     albumArtUrl: 'assets/images/album_covers/06.png',
     songs: [
         { title: 'Noir', duration: '4:31' },
         { title: 'Blanc', duration: '3:45' },
         { title: 'Chianti', duration: '5:04' },
         { title: 'Rose', duration: '3:55'},
         { title: 'Cabernet', duration: '2:44'}
     ]
 };
 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
      var $row = $(template);
     
     var clickHandler = function() {
	var songNumber = $(this).attr('data-song-number');

	if (currentlyPlayingSong !== null) {
		// change back to song number when new song plays
		var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
		currentlyPlayingCell.html(currentlyPlayingSong);
	}
	if (currentlyPlayingSong !== songNumber) {
		// Change play to pause when new song starts playing
		$(this).html(pauseButtonTemplate);
		currentlyPlayingSong = songNumber;
	} else if (currentlyPlayingSong === songNumber) {
		// Switch from Pause -> Play button to pause currently playing song.
		$(this).html(playButtonTemplate);
		currentlyPlayingSong = null;
	}
};
 
     
    var onHover = function(event) {
       //get song item number element
        var songItemNumber = $(this).find(".song-item-number");
        //get data-song-number from element
        var number = songItemNumber.attr("data-song-number");
        
        //if data-song-number is not currently playing 
        if(number !== currentlyPlayingSong){
        //  display play button
            songItemNumber.html(playButtonTemplate); 
        }
     };
     var offHover = function(event) {
         //get song item number element
        var songItemNumber = $(this).find(".song-item-number");
        //get data-song-number from element
        var number = songItemNumber.attr("data-song-number");
          //if data-song-number is  currently playing 
        if(number !== currentlyPlayingSong){
        //  do not display play button
            songItemNumber.html(number);
        }
     };
 
      // #1
     $row.find('.song-item-number').click(clickHandler);
     // #2
     $row.hover(onHover, offHover);
     // #3
     return $row;
 
 };



var setCurrentAlbum = function(album) {
    
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
     
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     
     $albumSongList.empty();
 
     
     for (var i = 0; i < album.songs.length; i++) {
          var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };


 // Album button templates
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

 // Store state of playing songs
 var currentlyPlayingSong = null;


 $(document).ready(function() {
     
     setCurrentAlbum(albumPicasso);
     
 

     var albums = [albumMarconi, albumSangio, albumPicasso];
     
     var index = 0;
     
     albumImage.addEventListener("click", function(event){
                                 
     setCurrentAlbum(albums[index]); 
     index++;
     if(index == albums.length){
         index = 0;
     }
                                 });
 });

