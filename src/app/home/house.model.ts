export interface House {
  id: string;

  clientId?: string;
  clientEmail?: string;

  pageTitle: string;
  pageSubtitle: string;

  backgroundImage: string;

  welcomeMessage: string;

  periodOfStayWidget: boolean;

  apartmentDetailService?: boolean;

  breakfastService?: HouseService;
  saunaService?: HouseService;
  feedbackService?: HouseService;

  feedbackLink: string;

  bakerEmail?: string;
}

export interface HouseService {
  title: string;
  subtitle: string;
  btnText: string;
  image: string;
  route: string;
  link: string;
  isVisible: boolean;
}
