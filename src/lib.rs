mod julia;
use wasm_bindgen::{prelude::*, Clamped, JsCast};
use web_sys::{console, ImageData};

// When the `wee_alloc` feature is enabled, this uses `wee_alloc` as the global
// allocator.
//
// If you don't want to use `wee_alloc`, you can safely delete this.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn draw() {
    // This provides better error messages in debug mode.
    // It's disabled in release mode so it doesn't bloat up the file size.
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();

    console::log_1(&JsValue::from_str("run with wasm"));

    let window = web_sys::window().unwrap();
    let performance = window.performance().unwrap();
    let document = window.document().unwrap();
    let canvas = document
        .get_element_by_id("julia")
        .expect("could not get canvas element.")
        .dyn_into::<web_sys::HtmlCanvasElement>()
        .expect("could not get canvas element.");
    let context = canvas
        .get_context("2d")
        .unwrap()
        .expect("could not get context.")
        .dyn_into::<web_sys::CanvasRenderingContext2d>()
        .unwrap();

    let width = canvas.width() as usize;
    let height = canvas.height() as usize;
    let min_real = get_input_val_as_num("minReal");
    let max_real = get_input_val_as_num("maxReal");
    let min_imag = get_input_val_as_num("minImag");
    let max_imag = get_input_val_as_num("maxImag");
    let c_real = get_input_val_as_num("cReal");
    let c_imag = get_input_val_as_num("cImag");
    let max_count = get_input_val_as_num("maxCount");

    // ジュリア集合生成
    let gen_start = performance.now();
    let mut result = julia::julia_set(
        width,
        height,
        min_real,
        max_real,
        min_imag,
        max_imag,
        c_real,
        c_imag,
        max_count as usize,
    );
    let gen_end = performance.now();

    // Canvasに描画
    let draw_start = performance.now();
    let img = ImageData::new_with_u8_clamped_array_and_sh(
        Clamped(&mut result),
        canvas.width(),
        canvas.height(),
    );
    if let Ok(img) = img {
        let _ = context.put_image_data(&img, 0.0, 0.0);
    }
    let draw_end = performance.now();

    // 処理時間
    console::log_1(&JsValue::from_str(&format!(
        "\tgenerate: {}[ms]",
        gen_end - gen_start
    )));
    console::log_1(&JsValue::from_str(&format!(
        "\tdraw: {}[ms]",
        draw_end - draw_start
    )));
}

pub fn get_input_val_as_num(id: &str) -> f64 {
    let document = web_sys::window().unwrap().document().unwrap();
    let element = document
        .get_element_by_id(id)
        .expect(&format!("element with the id \"{}\" does not exist.", id))
        .dyn_into::<web_sys::HtmlInputElement>()
        .expect(&format!("element with the id \"{}\" is not an InputElement.", id));
    let value = element.value_as_number();
    if value.is_nan() {
        panic!("value of the element with the id \"{}\" is not a number.", id);
    }
    value
}
