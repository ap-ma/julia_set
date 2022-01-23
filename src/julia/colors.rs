pub fn black(data: &mut Vec<u8>) {
  data.push(0);
  data.push(0);
  data.push(0);
  data.push(255);
}

pub fn blue_to_magenta(data: &mut Vec<u8>, d: u32) {
  data.push((63 + 6 * d) as u8);
  data.push(63);
  data.push(255);
  data.push(255);
}

pub fn magenta_to_white(data: &mut Vec<u8>, d: u32) {
  data.push(255);
  data.push((63 + 6 * (d - 32)) as u8);
  data.push(255);
  data.push(255);
}

pub fn white_to_cyan(data: &mut Vec<u8>, d: u32) {
  data.push((255 - 6 * (d - 64)) as u8);
  data.push(255);
  data.push(255);
  data.push(255);
}

pub fn cyan_to_green(data: &mut Vec<u8>, d: u32) {
  data.push(63);
  data.push(255);
  data.push((255 - 6 * (d - 96)) as u8);
  data.push(255);
}

pub fn green_to_yellow(data: &mut Vec<u8>, d: u32) {
  data.push((63 + 6 * (d - 128)) as u8);
  data.push(255);
  data.push(63);
  data.push(255);
}

pub fn yellow_to_red(data: &mut Vec<u8>, d: u32) {
  data.push(255);
  data.push((255 - 6 * (d - 160)) as u8);
  data.push(63);
  data.push(255);
}

pub fn red_to_black(data: &mut Vec<u8>, d: u32) {
  data.push((255 - 6 * (d - 192)) as u8);
  data.push(63);
  data.push(63);
  data.push(255);
}

pub fn black_to_blue(data: &mut Vec<u8>, d: u32) {
  data.push(63);
  data.push(63);
  data.push(63);
  data.push((63 + 6 * (d - 224)) as u8);
}
