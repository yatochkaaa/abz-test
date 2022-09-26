export interface User {
  id: number,
  name: string,
  email: string,
  phone: string,
  position: string,
  position_id: string,
  registration_timestamp: number,
  photo: string
}

export interface Position {
  id: number,
  name: string
};

export interface RegisterField {
  name: string,
  email: string,
  phone: string,
  position: Position,
  photo: any;
};
