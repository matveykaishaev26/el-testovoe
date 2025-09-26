export interface PaginatedResponse<T> {
  data: T;
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    total: number;
    to: 10;
    per_page: string;
    path: string;
  };
}

export interface Sale {
  g_number: string;
  date: string; // Можно заменить на Date, если будет парситься в дату
  last_change_date: string; // То же, что выше
  supplier_article: string;
  tech_size: string;
  barcode: number;
  total_price: string;
  discount_percent: string;
  is_supply: boolean;
  is_realization: boolean;
  promo_code_discount: string | null;
  warehouse_name: string;
  country_name: string;
  oblast_okrug_name: string;
  region_name: string;
  income_id: number;
  sale_id: string;
  odid: string | null;
  spp: string;
  for_pay: string;
  finished_price: string;
  price_with_disc: string;
  nm_id: number;
  subject: string;
  category: string;
  brand: string;
  is_storno: boolean | null;
}

export interface Filters {
  startDate?: string;
  endDate?: string;
  limit?: number;
}

export interface Order {
  g_number: string; // глобальный номер заказа
  date: string; // дата создания заказа
  last_change_date: string; // дата последнего изменения
  supplier_article: string; // артикул поставщика
  tech_size: string; // технический размер
  barcode: number; // штрихкод
  total_price: string; // общая стоимость
  discount_percent: number; // процент скидки
  warehouse_name: string; // склад
  oblast: string; // регион
  income_id: number; // id прихода
  odid: string; // id позиции заказа
  nm_id: number; // id товара
  subject: string; // предмет (код)
  category: string; // категория (код)
  brand: string; // бренд (код)
  is_cancel: boolean; // отменен ли заказ
  cancel_dt?: string; // дата отмены, если отменен
}

export type Income = {
  income_id: number; // ID прихода
  number: string; // номер документа (может быть пустым)
  date: string; // дата прихода
  last_change_date: string; // дата последнего изменения
  supplier_article: string; // артикул поставщика
  tech_size: string; // технический размер
  barcode: number; // штрихкод
  quantity: number; // количество
  total_price: string; // общая стоимость
  date_close: string; // дата закрытия прихода
  warehouse_name: string; // склад
  nm_id: number; // ID товара
};

export interface Stock {
  date: string; // дата записи
  last_change_date: string; // дата последнего изменения
  supplier_article: string; // артикул поставщика
  tech_size: string; // технический размер
  barcode: number; // штрихкод
  quantity: number; // текущее количество на складе
  is_supply: boolean; // флаг поступления
  is_realization: boolean; // флаг реализации
  quantity_full: number; // полное количество (с учетом всех приходов)
  warehouse_name: string; // название склада
  in_way_to_client: number; // количество в пути к клиенту
  in_way_from_client: number; // количество в пути от клиента
  nm_id: number; // ID товара
  subject: string; // код предмета
  category: string; // код категории
  brand: string; // код бренда
  sc_code: number; // код SC
  price: string; // цена
  discount: string; // скидка
}
