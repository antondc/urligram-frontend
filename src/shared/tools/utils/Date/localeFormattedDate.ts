export class LocaleFormattedDate {
  private date: Date;
  private locale: string;

  constructor(date: Date | string, locale: string) {
    this.date = new Date(date);
    this.locale = locale;
  }

  getLocaleFormattedDate(options?: { [key: string]: string }): string {
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
