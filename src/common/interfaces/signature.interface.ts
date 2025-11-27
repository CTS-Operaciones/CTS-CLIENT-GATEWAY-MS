export interface ICreateSignature {
  staff_id: number;
  signature_template_id: number;
  reference_id: number;
  reference_table: string;
}

export interface ICreateSignatureTemplate {
  report_type: string;
  order: number;
  type_signature_id: number;
  isBossSignature?: boolean;
  position_id?: number;
}

export interface ICreateTypeSignature {
  name: string;
}
