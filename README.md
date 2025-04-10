# Employee Management App

Aplikasi manajemen karyawan berbasis Angular yang mendukung fitur:
- Melihat daftar karyawan
- Filter berdasarkan username dan grup
- Melihat detail karyawan
- Menambah, mengedit, dan menghapus data karyawan

## Cara Menjalankan Aplikasi

### 1. Clone Repository

```bash
git clone https://github.com/ezz001-dev/employee-management.git
cd employee-management

### 2.  Install Dependencies
- Pastikan sudah meng-install Node.js dan npm.
npm install

### 3.  Menjalankan Aplikasi
ng serve  
npx ng serve
npm start

## Environment yang Dibutuhkan
Package	Versi
- Node.js	>= 18.x.x
- NPM	>= 9.x.x
- Angular CLI	>= 18.x
- Angular Material  ^18.2.14
- Angular notifier


 === Fitur Utama ===
 Tabel karyawan dengan pagination & sorting

 Filter username dan grup

 Dialog untuk edit dan hapus

 Detail karyawan lengkap

 Notifikasi menggunakan angular-notifier


 == Alur ==
 - login menggunakan username 'admin' dan password 'admin123'
 - setelah berhasil login akan di redirect ke halaman list emplyee 
 - tombol add employee untuk menambahkan new entry yang kan diredirect ke page add employee
 - setelah berhasil menambahkan new employee akan di redirect ke list employee dan new data akan tampil paling atas
 - tombol dengan icon i akan mengarahka ke page detail employee
 - tombol dengan icon pencil berfungsi untuk mengedit data employee yang akan menampilkan dialog form untuk meng update employee yang di pilih
 - tombol dengan icon sampah berfungsi untuk menghapus data employee yang akan menampilkan dialog form untuk meng hapus employee yang dipilih