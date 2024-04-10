import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthorizationResponse } from 'src/Models/sessionModel';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  constructor(private localSet$: LocalStorageService) { }

  save(key: string, value: any): void {
    const _key = key;
    const _value = JSON.stringify(value);
    localStorage.setItem(_key, _value);
  }

  get(key: string): AuthorizationResponse | string {
    const _key = key;
    const valueEncript = localStorage.getItem(_key);
    if (valueEncript === '' || typeof valueEncript !== 'string') {
      return null;
    }
    return JSON.parse(valueEncript);
  }

  delete = (key: string) => localStorage.removeItem(key);

  deleteAll = () => {
    localStorage.clear();
    location.reload();
  }

  clearStorage = () => {
    this.localSet$.clear();
  }
}
