export interface House {
  id: string;

  clientId: string;
  clientEmail: string;

  pageTitle: string;
  pageSubtitle: string;

  backgroundImage: string;

  welcomeMessage: string;

  periodOfStayWidget: boolean;

  apartmentDetailService: boolean;
  breakfastService: boolean;
  saunaService: boolean;
  feedbackService: boolean;

  feedbackLink: string;

  bakerEmail?: string;
}
