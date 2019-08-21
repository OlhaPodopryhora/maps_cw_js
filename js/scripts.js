$(document).ready(function(){
	'use strict';
	
});
let geocoder = null, map = null, marker = null, popup = null,
	currAddress = null, currLabel = 'M', currTitle = 'Mariupol';
function initMap() {
	geocoder = new google.maps.Geocoder();
	let select = document.getElementById('cities');
	geocode(select.value);
	select.addEventListener('change', function(){
		if (popup) popup.close();
		
		currTitle = select.querySelector('[value="' + select.value +'"]')
					.innerText;
		console.log(currLabel);
		geocode(select.value);
	});
	let center = {
		lat: 47.212451, 
		lng: 37.578760
	};
	map = new google.maps.Map(document.getElementById('map'), {
		center : center,
		zoom   : 15
	});
	
	window.addEventListener('resize', function() {
		map.setCenter(center);
	});
	// marker.setPosition(newPosition)
	// setInterval(function(){
	// 	//
	// }, 2000);
	// map.addListener('zoom_changed', function() {
	// 	map.setCenter(center);
	// })
}
function geocode(adressStr) {
	geocoder.geocode({address: adressStr}, function(results, status) {
		if (status = 'OK'){
			let coords = {
				lat : results[0].geometry.location.lat(),
				lng : results[0].geometry.location.lng()
		};
			currAddress = results[0].formatted_address;
			map.setCenter(coords);
			showMarker(coords);
		}else{
			alert(`Oops! Request status is ${status}. Try again later!`);
		}
	});
}
function showMarker(coords){
	if(marker) {
		marker.setPosition(coords);
		marker.setLabel(currTitle.charAt(0));
		marker.setTitle(currTitle);
	}else{
		marker = new google.maps.Marker({
			map 	 : map,
			position : coords,
			label	 : currTitle.charAt(0),
			title	 : currTitle,
			icon	 : 'favicon.ico'
	 	});
	 		marker.addListener('click', function(){
	 		showPopup();
		});
	}
}

function showPopup(){
	if (popup) {
		popup.setContent(getPopupContent());
	} else {
		popup = new google.maps.InfoWindow({
			content: getPopupContent()
  		});
	}
    popup.open(map, marker);	
}

function getPopupContent() {
	return `<b>Address: </b> ${currAddress}`;
}

