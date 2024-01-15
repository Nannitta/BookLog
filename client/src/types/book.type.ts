export interface Book {
  id?: string;
  title?: string;
  author?: string;
  editorial?: string;
  yearRelease?: string;
  cover?: string | File;
  resume?: string;
  createdAt?: Date;
  modifiedAt?: Date
}