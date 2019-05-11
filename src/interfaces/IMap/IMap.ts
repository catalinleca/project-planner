import {Map} from "immutable";

export interface IMap<T extends {[key: string]: any}> extends Map<string, any> {
  toJS(): T;
  toJSON(): T;
  toObject(): T;
  get<K extends keyof T>(key: K, defaultValue?: T[K]): T[K];
  set<K extends keyof T>(key: K, value: T[K]): this;
  getIn<K extends keyof T>(...args: any[]): any;
  update<K extends keyof T>(updater: (value: this) => this): this;
  update<K extends keyof T>(key: K, updater: (previousValue: T[K]) => T[K]): this;
  update<K extends keyof T>(key: K, notSetValue: T[K], updater: (previousValue: T[K]) => T[K]): this;
  withMutations<K extends keyof T>(mutator: (mutable: this) => any): this;
  merge<K extends keyof T>(...iterables: Array<IMap<Partial<T>>>): this;
}