export interface IDescriptionBond {
  description: string;
}

export interface ITypesBond {
  type: string;
}

export interface IBond {
  amount: number;
  description_id: IDescriptionBond;
  type_id: ITypesBond;
}

export interface IBondCreate {
  amount: number;
  description_id: number;
  type_id: number;
}

export interface IAssignBondToStaff {
  staff_id: number;
  date_assigned: string;
  date_limit: string;
  date_registration: string;
}

export interface ITypesBond {
  type: string;
}

export interface IDescriptionBond {
  description: string;
}
