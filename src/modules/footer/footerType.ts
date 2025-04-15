export type Footer = {
  id: number;
  copyright: string;
  hotline: string;
  address: string;
  email: string;
  aboutUs: string;
};

export type FooterResultType = {
  status: string;
  data: Array<Footer>;
};
