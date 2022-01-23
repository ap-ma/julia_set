mod colors;

// ジュリア集合を生成
pub fn julia_set(
  width: usize,
  height: usize,
  min_real: f64,
  max_real: f64,
  min_imag: f64,
  max_imag: f64,
  c_real: f64,
  c_imag: f64,
  max_count: usize,
) -> Vec<u8> {
  let height_f = height as f64;
  let width_f = width as f64;
  let mut data = vec![];
  for i in 0..height {
    let z_imag = (max_imag - min_imag) / height_f * i as f64 + min_imag;
    for j in 0..width {
      let z_real = (max_real - min_real) / width_f * j as f64 + min_real;
      let count = get_count(z_real, z_imag, c_real, c_imag, max_count);
      set_color(&mut data, count);
    }
  }
  data
}

// 発散までの繰返回数を取得
fn get_count(mut z_real: f64, mut z_imag: f64, c_real: f64, c_imag: f64, max_count: usize) -> u32 {
  for i in 1..max_count {
    let real = z_real * z_real - z_imag * z_imag + c_real;
    let imag = 2.0 * z_real * z_imag + c_imag;
    z_real = real;
    z_imag = imag;
    if z_real * z_real + z_imag * z_imag > 4.0 {
      return i as u32;
    }
  }
  0
}

// 色を設定
fn set_color(data: &mut Vec<u8>, count: u32) {
  if count == 0 {
    colors::black(data);
    return;
  }
  let sqrt = (count as f64).sqrt();
  let d = ((sqrt % 32.0) * 8.0) as u32;
  let m = (d / 32) as u8;
  match m {
    0 => colors::blue_to_magenta(data, d),
    1 => colors::magenta_to_white(data, d),
    2 => colors::white_to_cyan(data, d),
    3 => colors::cyan_to_green(data, d),
    4 => colors::green_to_yellow(data, d),
    5 => colors::yellow_to_red(data, d),
    6 => colors::red_to_black(data, d),
    7 => colors::black_to_blue(data, d),
    _ => colors::black(data),
  };
}
