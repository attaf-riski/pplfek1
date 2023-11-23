interface DataKHS {
  semesterAktif?: number | 0;
  jumlahSksSemester?: number | 0;
  jumlahSksKumulatif?: number | 0;
  IPS?: number | 0;
  IPK?: number | 0;
  scanKHS?: string | "";
  NIM?: string | "";
  verified?: boolean | false;
}

export default DataKHS;
