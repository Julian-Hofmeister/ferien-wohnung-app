export interface House {
  id: string;

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
  clientEmail: string;
}
