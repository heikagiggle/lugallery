export interface NextServerSideSearchParameterTypes {
  params: Promise<{ slug: string; id: string }>; 
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface ModalData {
  open: boolean;
  close?: () => void;
}

export interface ContainerProps {
  onNextStep: () => void;
  onPrevStep: () => void;
}

export type PageParams<
  TP = Record<string, string>,
  TS = Record<string, string | string[] | undefined>
> = {
  params: TP;
  searchParams: TS;
};