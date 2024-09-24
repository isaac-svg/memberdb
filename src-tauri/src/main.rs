// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{ Menu,};
// use tauri::api::file::read_binary;
// use tauri::api::dialog;



#[tauri::command]
fn show_message_box() {
    // dialog::message(Some("Info"), "Hello from Rust!");
    Menu::new();
}

// #[tauri::command]
// fn save_image(path: String, contents: Vec<u8>) -> Result<(), String> {
//   // write_file(path, contents).map_err(|err| err.to_string())
// }

fn main() {
  tauri::Builder::default().invoke_handler(tauri::generate_handler![show_message_box])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
