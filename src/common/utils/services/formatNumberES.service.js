export class FormatNumberESService {
  static formatNumber(intl, value): string {
    if (intl.locale === 'es' && value >= 1000 && value <= 9999) {
      const parts = value.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return parts.join(',');
    }
    return intl.formatNumber(value);
  }
}
