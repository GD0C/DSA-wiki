// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!(
        "Hello, {}! You've been greeted from Rust, now obey me son :)!",
        name
    )
}

#[tauri::command]
fn something(name: &str) -> String {
    format!("what is going on {}", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, something])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
