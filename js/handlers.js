function ico_locate_click(){
    console.log("ico_locate_click event detected...");
    location.reload();
}

function btn_location_click(){
    console.log("btn_location_click event detected...");
    main_router("loading");
    getLocation();
}