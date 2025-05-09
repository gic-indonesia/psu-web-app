export interface IProcess {
  id: number;
  nama_tahapan: string;
}

export class Process {
  id: number;
  nama_tahapan: string;

  constructor(data: IProcess) {
    this.id = data.id;
    this.nama_tahapan = data.nama_tahapan;
  }
}