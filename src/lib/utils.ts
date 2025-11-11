/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { StorageService } from "@shared/local-storage";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isUserLoggedIn = () => !!(StorageService().get('userData'))

export const isTokenExpired = () => {
  const expiredTime = StorageService().get('tokenExpiredTime');
  return !expiredTime || +expiredTime < new Date().getTime();
}

export const getUserData = () => {
  const users = StorageService().get('userData');
  if (typeof users === 'string') {
    return JSON.parse(users);
  }
}

export const modulesToAbilities = (modules: Array<any>) => {
  let abilities: Array<any> = [];
  for (const value of modules) {
    if (value.active) {
      abilities = [
        ...abilities,
        { action: 'active', subject: value.module_code },
      ];
    }
    if (value.tcreate) {
      abilities = [
        ...abilities,
        { action: 'create', subject: value.module_code },
      ];
    }
    if (value.tread) {
      abilities = [
        ...abilities,
        { action: 'read', subject: value.module_code },
      ];
    }
    if (value.tupdate) {
      abilities = [
        ...abilities,
        { action: 'update', subject: value.module_code },
      ];
    }
    if (value.tdelete) {
      abilities = [
        ...abilities,
        { action: 'delete', subject: value.module_code },
      ];
    }
  }
  return abilities;
}

export const toCurrency = (value: number, currency: string = 'IDR', locale: string = 'id-ID') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}

export function appendParams(
  obj: Record<string, any>,
  filter = new URLSearchParams(),
  prefix?: string
): URLSearchParams {
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];
    if (value === undefined || value === null || value === '') continue;

    const paramKey = prefix ? `${prefix}.${key}` : key;

    if (Array.isArray(value)) {
      // 🧩 jika array, append dengan index [0], [1], dst
      value.forEach((v, i) => {
        filter.append(`${paramKey}[${i}]`, v.toString());
      });
    } else if (typeof value === 'object') {
      // 🧱 jika object, recursive
      appendParams(value, filter, paramKey);
    } else {
      // 🧾 jika primitive
      filter.append(paramKey, value.toString());
    }
  }

  return filter;
}
