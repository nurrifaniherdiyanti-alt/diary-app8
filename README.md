# Diary App (`diary-app8`)

Aplikasi pencatat harian berbasis **React Native**, **Expo Router**, **Redux Toolkit**, dan **React-Redux** dengan TypeScript untuk Praktikum Mobile Programming Pertemuan 8.

## Fitur Utama
- **CRUD Global State (`diarySlice`)**: Menambah (`addDiary`), mengubah (`editDiary`), menandai favorit (`toggleFavorite`), menghapus satu catatan (`deleteDiary`), dan menghapus semua favorit (`clearAllFavorites`).
- **Multi-Screen & Filter**: Navigasi tab (`Home`, `Tambah`, `Favorite`), halaman dinamis (`detail/[id]` dan `edit/[id]`), filter suasana hati (*mood*), serta statistik Total Diary dan Total Favorite secara *real-time*.
- **Validasi & Empty State**: Validasi judul diary sebelum disimpan ke Redux Store serta tampilan *empty state* yang informatif saat daftar diary atau favorit kosong.

## Perbedaan Local State, Global Redux State, dan Persistent Database
- **Local State (`useState`)**: Menyimpan data sementara di dalam memori komponen lokal dan hanya dapat diakses oleh satu screen atau komponen tertentu—seperti nilai input form (`title`, `body`, `mood`) serta pilihan filter mood—sehingga datanya akan hilang saat komponen ditutup.
- **Global Redux State**: Menyimpan data secara terpusat di dalam memori aplikasi (*Redux Store*) agar dapat diakses dan disinkronkan oleh seluruh screen lintas navigasi—seperti daftar catatan (`entries`), status favorit (`liked`), dan statistik diary—namun bersifat sementara karena akan kembali ke *initialState* saat aplikasi di-*reload*.
- **Persistent Database**: Menyimpan data secara permanen di server atau media penyimpanan eksternal (seperti MySQL yang dihubungkan melalui REST API) sehingga catatan diary tersimpan jangka panjang dan tidak hilang meskipun aplikasi ditutup.