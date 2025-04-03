let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximunAge: 0
}

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
        success,
        error,
        options
    )
}else{
    alert('Los servicios de geolocalizacion no estan disponibles')
}



function success(position) {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude;

    let map = L.map('map', {
        center:[latitude,longitude],
        zoom: 14
    })

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    //-----------DEFINIR ICONOS
    let inicio = L.icon({
        iconUrl: '../assets/images/map/location-information-4-svgrepo-com.svg',
        iconSize:[38, 150],
        iconAnchor:[22, 94],
        popupAnchor:[-3, -35]
    })

    let final = L.icon({
        iconUrl: '../assets/images/map/location-svgrepo-com.svg',
        iconSize:[38, 150],
        iconAnchor:[22, 94],
        popupAnchor:[-3, -35]
    })

    let track = L.icon({
        iconUrl: '../assets/images/map/location-svgrepo-com (1).svg',
        iconSize:[38, 150],
        iconAnchor:[22, 94],
        popupAnchor:[-3, -35]
    })

    //-----------CALCULAR RUTA

    let control = L.Routing.control({
        waypoints:[
            //posicion inicial desde donde se encuentra la persona
            L.latLng(latitude,longitude),
            L.latLng(38.345959, -0.490458)
        ],

        language:'es',
        createMarker: function (i, wp, nWps) {
            switch(i){
                case 0 :
                    return L.marker(wp.latLng, {icon: inicio, draggable:true}).bindPopup('Inicio');
                case nWps-1:
                    return L.marker(wp.latLng, {icon: final, draggable:true}).bindPopup('Final');
                default:
                    return L.marker(wp.latLng, {icon: track, draggable:true}).bindPopup('Parada');
            }
        }

    }).addTo(map);
}

function error() {}
