export type AllKeys<T> = T extends unknown ? keyof T : never

export type AddMissingProps<T, K extends PropertyKey = AllKeys<T>> =
  T extends unknown ? (T & Record<Exclude<K, keyof T>, never>) : never;
