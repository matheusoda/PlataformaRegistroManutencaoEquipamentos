export interface Order {
  id?: number;
  type: number | null;
  typeName?: string | null;
  dateInit: Date;
  dateFin: Date | null;
  datePre: Date | null;
  description: string;
  status: string;
}
