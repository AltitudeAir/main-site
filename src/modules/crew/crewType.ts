export interface CrewsType {
  id: number;
  fname?: string;
  lname?: string;
  team: string;
  licenseNo: string;
  onType?: string;
  totalTime?: string;
  description?: string;
  image?: string;
  type?: SubType;
}

interface SubType {
  title: string;
}
