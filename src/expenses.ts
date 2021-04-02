type Currency = 'USD' | 'ARS';

interface IPrice {
  amount: number;
  currency: Currency;
}

interface IExpenseItem {
  id?: number;
  title: string;
  cost: IPrice;
}

interface IExpenses {
  expenses: ArrayList<IExpenseItem>;
  finalCurrency: Currency;
  add(item: IExpenseItem): boolean;
  get(idx: number): IExpenseItem | null;
  getTotal(): string;
  remove(id: number): boolean;
}

class ArrayList<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  add(item: T): void {
    this.items.push(item);
  }
  get(idx: number): T | null {
    const item: T[] = this.items.filter((_, i: number) => i === idx);
    if (item.length) return item[0];
    return null;
  }
  createFrom(value: T[]): void {
    this.items = [...value];
  }
  getAll(): T[] {
    return this.items;
  }
}

class Expenses implements IExpenses {
  expenses: ArrayList<IExpenseItem>;
  finalCurrency: Currency;

  private count: number = 0;

  constructor(currency: Currency) {
    this.finalCurrency = currency;
    this.expenses = new ArrayList<IExpenseItem>();
  }

  add(item: IExpenseItem): boolean {
    item.id = this.count;
    this.count++;
    this.expenses.add(item);
    return true;
  }
  get(idx: number): IExpenseItem | null {
    return this.expenses.get(idx);
  }
  getItems(): IExpenseItem[] {
    return this.expenses.getAll();
  }
  private convertCurrency(item: IExpenseItem, currency: Currency): number {
    switch (item.cost.currency) {
      case 'USD':
        if (currency === 'ARS') return item.cost.amount * 91.67;
        return item.cost.amount;
      default:
        if (currency === 'USD') return item.cost.amount / 91.67;
        return item.cost.amount;
    }
  }
  getTotal(): string {
    const total = this.expenses
      .getAll()
      .reduce((acc: number, el: IExpenseItem) => {
        return acc + this.convertCurrency(el, this.finalCurrency);
      }, 0);
    return `${this.finalCurrency} $${total.toFixed(2).toString()}`;
  }
  remove(id: number): boolean {
    const items = this.getItems().filter(el => {
      return el.id !== id;
    });
    this.expenses.createFrom(items);
    return true;
  }
}
