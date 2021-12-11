type Options = {
  unixTime: number;
  locale: string;
};

export class LocaleFormattedDate {
  private date: Date;
  private locale: string;

  constructor({ unixTime, locale }: Options) {
    const unixTimeMil = unixTime * 1000; // Unix time is in sec; new Date() needs miliseconds

    this.date = new Date(unixTimeMil);

    this.locale = locale;
  }

  getLocaleFormattedDate(options?: { [key: string]: string }): string {
    if (!this.locale || this.locale === '') return;

    const defaultLocaleOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const localeOptions = options || defaultLocaleOptions;
    const formattedDate = this.date.toLocaleDateString(this.locale, localeOptions);

    return formattedDate;
  }
}
