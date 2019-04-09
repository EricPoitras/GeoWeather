function main_router(view){
    switch(view) {
  case "loading":
    section_content.classList.remove("d-none");
    section_map.classList.add("d-none");
    view_landing.classList.add("d-none");
    view_loading.classList.remove("d-none");
    view_map.classList.add("d-none");
    break;
  case "map":
    section_content.classList.add("d-none");
    section_map.classList.remove("d-none");
    view_landing.classList.add("d-none");
    view_loading.classList.add("d-none");
    view_map.classList.remove("d-none");
    break;
  default:
    section_content.classList.remove("d-none");
    section_map.classList.add("d-none");
    view_landing.classList.remove("d-none");
    view_loading.classList.add("d-none");
    view_map.classList.add("d-none");
  }
}

