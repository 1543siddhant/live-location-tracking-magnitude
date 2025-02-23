let map;
let marker;
let currentPosition = { lat: 0, lng: 0 };
let tracking = false;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: currentPosition,
    mapTypeId: 'roadmap'
  });

  marker = new google.maps.Marker({
    position: currentPosition,
    map: map,
    title: "Your Location",
    animation: google.maps.Animation.BOUNCE
  });
}

function updateLocation(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  currentPosition = { lat, lng };

  marker.setPosition(currentPosition);
  map.setCenter(currentPosition);
  document.getElementById('coordinates').textContent = `Latitude: ${lat.toFixed(5)} | Longitude: ${lng.toFixed(5)}`;
}

function trackLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(updateLocation, 
      error => console.error('Error getting location:', error), 
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );
    // Enable the "Get Directions" button now
    document.getElementById('getDirections').disabled = false;
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function navigateToGoogleMaps() {
  window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${currentPosition.lat},${currentPosition.lng}`;
}

document.getElementById('startTracking').addEventListener('click', function() {
  if (!tracking) {
    trackLocation();
    tracking = true;
    // Reveal the map, coordinates, and "Get Directions" button
    document.getElementById('map').classList.remove('hidden');
    document.getElementById('coordinates').classList.remove('hidden');
    document.getElementById('getDirections').classList.remove('hidden');
    // Hide the Start Tracking button and the logo
    document.getElementById('startTracking').classList.add('hidden');
    document.getElementById('logo').classList.add('hidden');
    // Trigger a resize on the map after a short delay to ensure proper rendering
    setTimeout(() => {
      google.maps.event.trigger(map, 'resize');
      map.setCenter(currentPosition);
    }, 100);
  }
});

window.onload = function () {
  initMap();
};
