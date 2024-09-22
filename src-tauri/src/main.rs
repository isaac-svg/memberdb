// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu,};
// use tauri::api::dialog;

#[tauri::command]
 fn greet(name: &str) ->String{
  println!("Hello {}! ", name);
  format!("Hello {}! ", name)

}

#[tauri::command]
fn show_message_box() {
    // dialog::message(Some("Info"), "Hello from Rust!");
    Menu::new();
}
fn main() {
  tauri::Builder::default().invoke_handler(tauri::generate_handler![greet,show_message_box])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
