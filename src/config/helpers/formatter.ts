export class Formatter {
  public static currency(value: number | null | undefined): string {
    if (value === 0 || value === null || value === undefined || isNaN(value)) {
      return 'Valor não disponível';
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      // notation: 'compact',
    }).format(value);
  }
}
