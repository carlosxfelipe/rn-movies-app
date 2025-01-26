export class Formatter {
  public static currency(value: number | null | undefined): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '-';
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      // notation: 'compact',
    }).format(value);
  }
}
